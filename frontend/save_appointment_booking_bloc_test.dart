import 'package:bloc_test/bloc_test.dart';


void main() {
  group('SaveAppointmentBloc()', () {
    String addressLine1 = 'testAddressLine1';
    String addressLine2 = 'testAddressLine2';
    String firstName = 'Test';
    String lastName = 'LastName';
    String type = 'Private';
    String email = 'test.email@gmail.com';
    String phoneNumber = '0943 871 9880';
    String landlineNumber = '(033) 320 1212';
    num amount = 800;
    String status = 'Approved';
    String method = 'G-cash';
    String serviceType = 'Cleaning';
    int unitQuantity = 2;
    String unitType = 'Split-Type';
    DateTime dateTime = DateTime.now();
    DateTime timeCreated = DateTime.now();
    String uid = '';

    Address address = Address(
      addressLine1: addressLine1,
      addressLine2: addressLine2,
    );

    CustomerDetails customerDetails = CustomerDetails(
      firstName: firstName,
      lastName: lastName,
      type: type,
      email: email,
      phoneNumber: phoneNumber,
      landlineNumber: landlineNumber,
      address: address,
    );

    PaymentDetails paymentDetails = PaymentDetails(
      amount: amount,
      status: status,
      method: method,
    );

    ServiceDetails serviceDetails = ServiceDetails(
      serviceType: serviceType,
      unitQuantity: unitQuantity,
      unitType: unitType,
    );

    AppointmentSchedule appointmentSchedule = AppointmentSchedule(
      dateTime: dateTime,
    );

    List<TechnicianDetails>? technicians = [
      TechnicianDetails(
        uid: '2',
        workEmail: 'test@gmail.com',
        password: 'password',
        address: 'test address',
        fullName: 'Test Technician',
        personalEmail: 'personalEmail@gmail.com',
        contactNumber: '09453211764',
        designation: 'test designation',
        status: 'Active',
        activityStatus: 'test Status',
      ),
      TechnicianDetails(
        uid: '3',
        workEmail: 'test2@gmail.com',
        password: 'password',
        address: 'test address2',
        fullName: 'Test2 Technician',
        personalEmail: 'personalEmail2@gmail.com',
        contactNumber: '09453211764',
        designation: 'test designation',
        status: 'Active',
        activityStatus: 'test Status',
      ),
    ];

    FakeFirebaseFirestore fakeFirestore = FakeFirebaseFirestore();

    blocTest(
      'emits [] when nothing is saved.',
      build: () => SaveAppointmentBloc(),
      expect: () => [],
    );

    blocTest(
      'emits SaveAppointmentLoading and SaveAppointmentComplete when saveAppointment() is called with valid appointment details,',
      build: () => SaveAppointmentBloc(firestore: fakeFirestore),
      act: (SaveAppointmentBloc bloc) => bloc
        ..saveAppointment(
          address,
          customerDetails,
          paymentDetails,
          serviceDetails,
          technicians,
          timeCreated,
          appointmentSchedule,
          status,
        ),
      expect: () {
        return const [SaveAppointmentLoading(), SaveAppointmentSuccess()];
      },
    );

    List<TechnicianDetails> failTechnicians = [];

    blocTest(
      'emits SaveAppointmentFail() when saveAppointment() is called with invalid appointment details,',
      build: () => SaveAppointmentBloc(firestore: fakeFirestore),
      act: (SaveAppointmentBloc bloc) => bloc
        ..saveAppointment(
          address,
          customerDetails,
          paymentDetails,
          serviceDetails,
          failTechnicians,
          timeCreated,
          appointmentSchedule,
          status,
        ),
      expect: () {
        return const [SaveAppointmentFail('Invalid Appointment Details.')];
      },
    );

    blocTest(
      'emits SaveAppointmentInitial() when reinitialize() is called.',
      build: () => SaveAppointmentBloc(),
      act: (SaveAppointmentBloc bloc) {
        return bloc.reinitialize();
      },
      expect: () {
        return [const SaveAppointmentInitial()];
      },
    );
  });
}
