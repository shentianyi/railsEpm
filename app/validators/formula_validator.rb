#公式验证 V0.1
#对于用户输入的公式提供验证
#约定一个公式只能使用一种括号类型来表明优先级,默认的操作符号存储在@@OPERATOR哈希中
#一个公式可能存在着操作符，数字和用户自定义变量，其中用户自定义变量应该遵守一定的规则，变量由is_variable_pattern_allowed检查

class FormulaValidator

@@LEFT_ASSOC=0
@@RIGHT_ASSOC=1

#
@@OPERATORS={'+'=>[0,@@LEFT_ASSOC],
             '-'=>[0,@@LEFT_ASSOC],
             '*'=>[5,@@LEFT_ASSOC],
             '/'=>[5,@@LEFT_ASSOC],
             '%'=>[5,@@LEFT_ASSOC],
             '^'=>[10,@@RIGHT_ASSOC]}

# Key代表将要加到公式右边的类型，VALUE代表左侧最近的元素所允许的类型
@@ALLOWED_LEFT_TOKEN={:TOP=>[],
                      :OPERATOR=>[:RIGHT_TOKEN,:VARIABLE],
                      :LEFT_TOKEN=>[:TOP,:LEFT_TOKEN,:OPERATOR],
                      :RIGHT_TOKEN=>[:LEFT_TOKEN,:VARIABLE,:RIGHT_TOKEN],
                      :VARIABLE=>[:TOP,:LEFT_TOKEN,:OPERATOR]}

#默认的左括号
@@LEFT='('

#默认的右括号
@@RIGHT=')'

#用户自定义变量所有允许的PATTERN，关系为或，即变量只要符合其中一个样式即可通过
@@VARIABLE_ALLOWED_PATTERNS=[/^\[\w*\]$/,/^[1-9][0-9]*(\.?[0-9]*)*$/]

#变量中止符号，当一个变量中止符号出现时，程序知道一个变量结束，比如，ab+c,系统遍历至+号时，认为+为一个变量终止符，则认定ab是一个变量名
@@VARIABLE_BREAKER=[@@LEFT,@@RIGHT] | @@OPERATORS.keys

#检查操作符的优先级
def self.compare_precedence(token1,token2)
  raise NonOperandError if (not is_supported_operator?(token1) and not is_supported_operator?(token2))
  return @@OPERATORS[token1][1]-@@OPERATORS[token2][1]
end

#检查传入的字符是否为左括号
def self.is_left?(token)
  return (token == @@LEFT)
end

#检查传入的字符是否为右括号
def self.is_right?(token)
  return (token == @@RIGHT)
end

#检查传入的字符是否为操作符
def self.is_supported_operator?(token)
  @@OPERATORS.has_key?token
end

#检查传入的操作符是左连接还是右连接
def self.is_associative?(token, assoc)
  raise NonOperandError if not is_supported_operator?(token)
  return @@OPERATORS[token][1]==assoc
end

#检查变量名是否符合规则
def self.is_variable_pattern_allowed(variable)
  result=false
  @@VARIABLE_ALLOWED_PATTERNS.each {|t|
    result=true if t.match(variable)!=nil
  }
  return result
end

#检查符号能否合法地加入到一个公式的右边，比如，左括号不允许直接跟操作符，比如a+(+d)是没有意义的
def self.is_token_allowed(left_token_type,push_token_type)
  raise UnknownTokenTypeError if(!@@ALLOWED_LEFT_TOKEN.has_key?(left_token_type) || !@@ALLOWED_LEFT_TOKEN.has_key?(push_token_type))
  return @@ALLOWED_LEFT_TOKEN[push_token_type].include?(left_token_type)
end

#获取到类型
def self.token_type(token)
  if token==nil
    return :TOP
  elsif is_left?(token)
    return :LEFT_TOKEN
  elsif is_right?(token)
    return :RIGHT_TOKEN
  elsif is_supported_operator?(token)
    return :OPERATOR
  else
    return :VARIABLE
  end
end

#检查是否为变量中止符
def self.is_variable_breaker?(token)
  return @@VARIABLE_BREAKER.include?(token)
end




#主验证程序开始，验证公式组成是否正确，各个变量是否命名准确，各个变量和操作符位置是否正确,各括号是否关闭正确

def self.complete_validate_infix(infix)
    result= validate_infix!(infix)
    return result if result==false
    return validate_closing_with_nesting(result)
  end

#验证公式组成是否正确，各个变量是否命名准确，各个变量和操作符位置是否一致
def self.validate_infix!(infix)
    raise ArgumentError if (infix==nil || !infix.kind_of?(String) || infix=='')
    infix_array=infix.split('')
    infix_stack=[]
    temp_variable=[]
    infix_array.each{|item|
      if infix_stack.count==0 && temp_variable.count==0
        return false if(is_right?(item)||is_supported_operator?(item))
        if(is_left?(item))
          infix_stack.push(item)
        else
          temp_variable.push(item)
        end
      else
        if temp_variable.count>0
          if is_variable_breaker?(item)
            unless is_token_allowed(token_type(infix_stack.last),:VARIABLE)
              return false
            end
            return false if !is_variable_pattern_allowed temp_variable.join
            infix_stack.push temp_variable.join
            temp_variable=[]
            return false if !is_token_allowed(token_type(infix_stack.last),token_type(item))
            infix_stack.push(item)
          else
            temp_variable.push(item)
          end
        else
          if token_type(item)==:VARIABLE
            temp_variable.push(item)
          else
            return false if not is_token_allowed(token_type(infix_stack.last),token_type(item))
            infix_stack.push(item)
          end
        end
      end
    }
    if temp_variable.count>0
      return false if !is_variable_pattern_allowed temp_variable.join
      infix_stack.push(temp_variable.join)
    else
      return false if token_type(infix_stack.last)==:OPERATOR
    end
    return infix_stack
  end

#验证括号是否关闭正确，允许嵌套
def self.validate_closing_with_nesting(tokens,left='(',right=')')
  raise 'argument allows only string or array' if (not tokens.kind_of?(String)) && (not tokens.kind_of?(Array))
  if tokens.kind_of?(String)
    tokens_array = tokens.split('')
  else
    tokens_array=tokens
  end
  stack=[]
  tokens_array.each {|t|
    if stack.size==0
      if (t==right)
        return false
      elsif(t==left)
        stack.push(t)
      end
    else
      if(t==right)
        stack.pop
      elsif(t==left)
        stack.push(t)
      end
    end
  }
  return true if stack.count==0
  return false
end

#验证括号是否关闭正确，不允许嵌套
def self.validate_closing_without_nesting (tokens,left='(',right=')' )
  raise 'argument allows only string or array' if (!tokens.kind_of?(String)) && (!tokens.kind_of?(Array))
  if tokens.kind_of?(String)
    tokens_array = tokens.split('')
  else
    tokens_array=tokens
  end

  stack=[]
  tokens_array.each {|t|
    if stack.size==0
      if (t==right)
        return false
      elsif(t==left)
        stack.push t
      end
    else
      if(t==right)
        stack.pop
      elsif(t==left)
        return false
      end
    end
  }
  return true if stack.count==0
  return false
end




end



class NonFormulaTokenError<StandardError

end

class NonOperandError<StandardError

end

class FormulaNestingError<StandardError

end

class UnknownTokenTypeError<StandardError

end




