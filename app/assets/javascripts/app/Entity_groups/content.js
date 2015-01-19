define(["jquery","base"],function($,Base){
    $("body").on("click", "#assign-entity-wrap li>i", function () {
        var id = $(this).attr("entity_id"),
            $this = $(this);
        if (confirm(I18n.t('manage.view.unassign_confirm'))) {
            $.ajax({
                url: '/entity_group_items/' + id,
                type: 'DELETE',
                success: function (data) {
                    if (data.result) {
                        $this.parent().remove();
                    } else {
                        Base.MessageBox(data.content, "top", "warning");
                    }
                }
            });
        }
    });
})