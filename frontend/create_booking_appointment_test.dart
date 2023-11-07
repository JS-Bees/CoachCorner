import 'package:bloc_test/bloc_test.dart';


void main() {
  group('CreateBookingBloc()', () {
    String addressLine1 = 'addressLine1';
    String addressLine2 = 'addressLine2';
    String email = 'Jedro1270@gmail.com';
    String type = 'Private';
    String firstName = 'Juan';
    String lastName = 'Dela Cruz';
    String companyName = 'Government';
    String phoneNumber = '09958495847';
    String landlineNumber = '(033) 320 1212';

    int repetitionAmount = 1;
    String repetitionDuration = 'week';
    int occurrences = 2;
    DateTime dateTime = DateTime(2000, 1, 1, 5, 30);
    List<String> selectedDays = [];

    String description = 'test';
    String serviceType = 'cleaning';
    int unitQuantity = 1;
    String unitType = 'Standing';
    double paymentAmount = 100;

    List<TechnicianDetails> technicians = [
      TechnicianDetails(
        designation: 'master',
        fullName: 'Mark Steven',
        status: 'pending',
        contactNumber: '0956433212',
        workEmail: 'johntechnician@gmail.com',
        personalEmail: 'johnpersonal@gmail.com',
        password: 'password123',
        address: 'Sample address',
        activityStatus: 'Standby',
      ),
    ];

    final firestore = FakeFirebaseFirestore();

    Address address = Address(
      addressLine1: addressLine1,
      addressLine2: addressLine2,
    );

    CustomerDetails customerDetails = CustomerDetails(
      phoneNumber: phoneNumber,
      landlineNumber: landlineNumber,
      firstName: firstName,
      lastName: lastName,
      email: email,
      type: type,
      address: address,
    );

    Recurrence recurrence = Recurrence(
      repetitionAmount: repetitionAmount,
      repetitionDuration: repetitionDuration,
      occurrences: occurrences,
    );

    AppointmentSchedule appointmentSchedule = AppointmentSchedule(
      recurrence: recurrence,
      dateTime: dateTime,
    );

    ServiceDetails serviceDetails = ServiceDetails(
      description: description,
      serviceType: serviceType,
      unitQuantity: unitQuantity,
      unitType: unitType,
    );

    blocTest(
      'emits [] when nothing is added',
      build: () => CreateBookingBloc(),
      expect: () => [],
    );

    blocTest(
      'emits CreateBookingCustomerDetailsAdded when addCustomerDetails is called',
      build: () => CreateBookingBloc(),
      act: (CreateBookingBloc bloc) {
        return bloc.addCustomerDetails(
          addressLine1,
          addressLine2,
          email,
          type,
          firstName,
          lastName,
          companyName,
          phoneNumber,
          "",
          landlineNumber,
        );
      },
      expect: () {
        return [CreateBookingCustomerDetailsAdded(customerDetails, address)];
      },
    );

    blocTest(
      'emits CreateBookingAppointmentScheduleAdded when addAppointmentSchedule is called',
      build: () => CreateBookingBloc(),
      act: (CreateBookingBloc bloc) {
        return bloc.addAppointmentSchedule(
          repetitionAmount,
          repetitionDuration,
          occurrences,
          dateTime,
          selectedDays,
        );
      },
      expect: () {
        return [CreateBookingAppointmentScheduleAdded(appointmentSchedule)];
      },
    );

    blocTest(
      'emits CreateBookingServiceDetailsAdded when addServiceDetails is called',
      build: () => CreateBookingBloc(),
      act: (CreateBookingBloc bloc) {
        return bloc.addServiceDetails(
          description,
          serviceType,
          unitQuantity,
          unitType,
          paymentAmount,
        );
      },
      expect: () {
        return [CreateBookingServiceDetailsAdded(serviceDetails)];
      },
    );

    blocTest(
      'emits CreateBookingTechniciansAdded when addTechnicians is called',
      build: () => CreateBookingBloc(),
      act: (CreateBookingBloc bloc) {
        return bloc.addTechnicians(technicians);
      },
      expect: () {
        return [CreateBookingTechniciansAdded(technicians)];
      },
    );

    blocTest(
      'emits CreateBookingLoading, then CreateBookingCompleted when completeBooking is called',
      build: () => CreateBookingBloc(firestore: firestore),
      act: (CreateBookingBloc bloc) => bloc
        ..addCustomerDetails(
          addressLine1,
          addressLine2,
          email,
          type,
          firstName,
          lastName,
          companyName,
          phoneNumber,
          "",
          landlineNumber,
        )
        ..completeBooking(),
      skip: 1,
      expect: () {
        return [const CreateBookingLoading(), const CreateBookingCompleted()];
      },
    );
  });
}
