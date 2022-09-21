var externalUrl = 'http://learn.knockoutjs.com';

function Task(data) {
	this.title = ko.observable(data.title);
	this.isDone = ko.observable(data.isDone);
}

function TaskListViewModel() {
	// Data
	var self = this;
	self.tasks = ko.observableArray([]);
	self.newTaskText = ko.observable();

	self.incompleteTasks = ko.computed(function () {
		return ko.utils.arrayFilter(self.tasks(), function (task) {
			return !task.isDone() && !task._destroy
		});
	});

	// Operations
	self.addTask = function () {
		self.tasks.push(new Task({title: this.newTaskText()}));
		self.newTaskText("");
	};
	self.removeTask = function (task) {
		self.tasks.remove(task);
		self.tasks.destroy(task);
	};

	$.getJSON(externalUrl + '/tasks', function (allData) {
		var mappedTasks = $.map(allData, function (item) {
			return new Task(item);
		});
		self.tasks(mappedTasks);
	});

	self.save = function () {
		$.ajax(externalUrl + '/tasks', {
			data: ko.toJSON({tasks: self.tasks}),
			type: 'post',
			contentType: 'application/json',
			success: function (result) {
				console.log(result);
			}
		});
	}
}

ko.applyBindings(new TaskListViewModel());