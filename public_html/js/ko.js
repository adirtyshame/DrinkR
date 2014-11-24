function Beverage(data) {
    var self = this;
    self.name = ko.observable((data && data.name) || '');
    self.price = ko.observable((data && data.price) || 0);
    self.image = ko.observable((data && data.image) || 'img/nopic.jpg');
}

function Person(data) {
    var self = this;
    self.name = ko.observable((data && data.name) || '');
    self.avatar = ko.observable((data && data.avatar) || 'img/avatar.png');
    self.note = ko.observable((data && data.note) || '');
    self.cans = ko.observable(0);
    self.bottles = ko.observable(0);
    self.addBottle = function () {
        self.bottles(self.bottles() + 1);
    };
    self.addCan = function () {
        self.cans(self.cans() + 1);
    };
    self.total = ko.computed(function () {
        return accounting.formatMoney(self.bottles() * 1.25 + self.cans() * 1.5, "€", 2, ".", ",");
    });
}

var viewModel = {
    debug: ko.observable(true),
    person: ko.observable(new Person()),
    edit: ko.observable(false),
    persons: ko.observableArray([new Person({name: 'test1'}), new Person({name: 'test2'})]),
    beverages: ko.observableArray([new Beverage({name: 'Flasche', price: 1.25, image: 'img/flasche_klein.jpg'}), new Beverage({name: 'Dose', price: 1.50, image: 'img/dose_klein.jpg'})]),
    selectedPerson: ko.observable({}),
    select: function (data) {
        if (data === this.selectedPerson()) {
            this.selectedPerson({});
        } else {
            this.selectedPerson(data);
        }
    },
    addPerson: function () {
        this.persons.push(new Person(ko.toJS(this.person)));
        this.person({});
        this.edit(false);
    },
    removePerson: function (data) {
        if (confirm('Delete user "' + data.name() + '"?')) {
            this.persons.remove(data);
        }
    }
};

$(document).ready(function () {
    ko.applyBindings(viewModel);
});