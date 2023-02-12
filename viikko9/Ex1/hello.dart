void main() {
  print('Hello, World!');

  // new person,
  Henkilo person = Henkilo('John', 20, 80.0, 180.0);
  person.printInfo();

  // new person, height and weight are optional
  Henkilo person2 = Henkilo('Jane', 20);

  // new person, very small
  Henkilo person3 = Henkilo.verySmallPerson('Jack', 20);

  // Array of persons
  List<Henkilo> persons = [person, person2, person3];

  // new student
  Student student = Student('John', 20, 80.0, 180.0, 123456, 0);

  // add student to persons
  persons.add(student);

  // loop through persons
  for (Henkilo person in persons) {
    person.printInfo();
  }
}

class Henkilo {
  // Variables
  String name;
  int age;
  late double weight;
  late double height;

  // Constructor, height and weight are optional
  Henkilo(this.name, this.age, [this.weight = 0.0, this.height = 0.0]);

  // Very Small person constructor
  Henkilo.verySmallPerson(this.name, this.age)
      : weight = 0.0,
        height = 50.0;

  // Getters
  String getName() {
    return name;
  }

  int getAge() {
    return age;
  }

  double getWeight() {
    return weight;
  }

  double getHeight() {
    return height;
  }

  // Setters

  void setName(String name) {
    this.name = name;
  }

  void setAge(int age) {
    this.age = age;
  }

  void setWeight(double weight) {
    this.weight = weight;
  }

  void setHeight(double height) {
    this.height = height;
  }

  // Methods

  //print to console
  void printInfo() {
    print('Name: $name, Age: $age, Weight: $weight, Height: $height');
  }
}

// Subclass Student

class Student extends Henkilo {
  // Variables
  int id;
  int credits;

  // Constructor
  Student(
      String name, int age, double weight, double height, this.id, this.credits)
      : super(name, age, weight, height);

  // Getters
  int getId() {
    return id;
  }

  int getCredits() {
    return credits;
  }

  // Setters
  void setId(int id) {
    this.id = id;
  }

  void setCredits(int credits) {
    this.credits = credits;
  }

  // Methods
  void printInfo() {
    print(
        'Name: $name, Age: $age, Weight: $weight, Height: $height, ID: $id, Credits: $credits');
  }
}
