function Beverage(data) {
    var self = this;
    self.name = ko.observable((data && data.name) || '');
    self.description = ko.observable((data && data.description) || '');
    self.price = ko.observable((data && data.price) || 0);
    self.image = ko.observable((data && data.image) || 'img/nopic.jpg');
}

function Person(data) {
    var self = this;
    self.name = ko.observable((data && data.name) || '');
    self.mail = ko.observable((data && data.mail) || '');
    self.avatar = ko.observable((data && data.avatar) || 'img/avatar.png');
    self.note = ko.observable((data && data.note) || '');
    self.drinks = ko.observableArray([]);
    self.count = function(drink) {
        var sum = 0;
        self.drinks().forEach(function(element, index, array){
            if (element === drink) {
                sum += 1;
            }
        });
        return sum;
    };
    self.addDrink = function (drink) {
        self.drinks.push(drink);
    };
    self.total = ko.computed(function () {
        var sum = 0;
        self.drinks().forEach(function (element, index, array) {
            sum += element.price();
        });
        return accounting.formatMoney(sum, "€", 2, ".", ",");
    });
}

var viewModel = {
    debug: ko.observable(true),
    person: ko.observable(new Person()),
    edit: ko.observable(false),
    persons: ko.observableArray([]),
    beverages: ko.observableArray([]),
    selectedPerson: ko.observable({}),
    select: function (data) {
        this.selectedPerson(data);
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
    $.get('drinks.json').done(function(result){
        result.forEach(function(element, index, array){
            viewModel.beverages.push(new Beverage(element));
        });
    }).fail(function(){
        console.log('error loading drinks.json');
    });
    $.get('persons.json').done(function(result){
        result.forEach(function(element, index, array){
            viewModel.persons.push(new Person(element));
        });
    }).fail(function(){
        console.log('error loading drinks.json');
    });
    ko.applyBindings(viewModel);
});