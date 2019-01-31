import View from '@girder/core/views/View';

import PaginateTasksWidget from './PaginateTasksWidget';

var TaskListView = View.extend({
    initialize: function () {
        this.paginateWidget = new PaginateTasksWidget({
            el: this.$el,
            parentView: this,
            itemUrlFunc: (task) => {
                return `#item_task/${task.id}/run`;
            }
        });
    }
});

export default TaskListView;
