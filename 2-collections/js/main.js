// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
	var self = this;
	self.name = name;
	self.mealObject = ko.observable(initialMeal);

	self.formattedPrice = ko.computed(function () {
		var price = self.mealObject().price;
		return price ? "$" + price.toFixed(2) : "None";
	});
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
	var self = this;

	// Non-editable catalog data - would come from the server
	self.availableMeals = [
		{mealName: "Standard (sandwich)", price: 0},
		{mealName: "Premium (lobster)", price: 34.95},
		{mealName: "Ultimate (whole zebra)", price: 290},
		{mealName: "Homer", price: 29000}
	];

	// Editable data
	self.seats = ko.observableArray([
		new SeatReservation("Homer", self.availableMeals[3]),
		new SeatReservation("Bart", self.availableMeals[1]),
		new SeatReservation("Lisa", self.availableMeals[2]),
		new SeatReservation("Marge", self.availableMeals[0])
	]);

	self.addSeat = function () {
		self.seats.push(new SeatReservation("", self.availableMeals[0]));
	};

	self.removeSeat = function (seat) {
		self.seats.remove(seat)
	};

	self.totalSurcharge = ko.computed(function () {
		var total = 0;
		for (var i = 0; i < self.seats().length; i++) {
			total += self.seats()[i].mealObject().price;
		}

		return total;
	});
}

ko.applyBindings(new ReservationsViewModel());
