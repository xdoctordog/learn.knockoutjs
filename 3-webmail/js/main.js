var externalUrl = 'http://learn.knockoutjs.com/';

function WebmailViewModel() {
	// Data
	var self = this;
	self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
	self.chosenFolderId = ko.observable();
	self.chosenFolderData = ko.observable();
	self.chosenMailData = ko.observable();

	// Behaviours
	self.goToFolder = function (folder) {
		location.hash = folder;

		//self.chosenFolderId(folder);
		//self.chosenMailData(null);
		//$.get('/mail', {folder: folder}, self.chosenFolderData);
	};

	self.goToMail = function (mailItem) {
		location.hash = mailItem.folder + '/' + mailItem.id;
		//self.chosenFolderId(mailItem.folder);
		//self.chosenFolderData(null);
		//$.get('/mail', {mailId: mailItem.id}, self.chosenMailData);
	}

	//self.goToFolder('Inbox');

	Sammy(function () {
		this.get('#:folder', function () {
			self.chosenFolderId(this.params.folder);
			self.chosenMailData(null);
			$.get(externalUrl + '/mail', {folder: this.params.folder}, self.chosenFolderData);
		});

		this.get('#:folder/:mailId', function () {
			console.log(this.params);

			self.chosenFolderId(this.params.folder);
			self.chosenFolderData(null);
			$.get(externalUrl + '/mail', {mailId: this.params.mailId}, self.chosenMailData);
		});

		this.get('', function () {
			this.app.runRoute('get', '#Inbox')
		});


	}).run();
};

ko.applyBindings(new WebmailViewModel());