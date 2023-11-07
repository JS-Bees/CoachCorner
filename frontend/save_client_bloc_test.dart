import 'package:bloc_test/bloc_test.dart';

void main() {
  group('SaveCustomerBloc()', () {
    String firstName = 'Marc';
    String lastName = 'Sanchez';
    String email = 'marc.sanchez-2019@gmail.com';
    String phoneNumber = '03354678880';
    String landlineNumber = '(033) 320 1212';
    String type = 'Private';
    String addressLine1 = 'Lakewood Constancia';
    String addressLine2 = 'Merryville Town, St. Venice street';
    String companyName = 'Test Company';
    String secondaryPhoneNumber = '09546756643';

    FakeFirebaseFirestore fakeFirestore = FakeFirebaseFirestore();

    // Address address = Address(
    //   addressLine1: addressLine1,
    //   addressLine2: addressLine2,
    // );

    // CustomerDetails customerDetails = CustomerDetails(
    //   phoneNumber: phoneNumber,
    //   landlineNumber: landlineNumber,
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   type: type,
    //   address: address,
    // );

    blocTest(
      'emits [] when nothing is saved.',
      build: () => SaveCustomerBloc(),
      expect: () => [],
    );

    blocTest(
      'emits SaveCustomerLoading and SaveCustomerSuccess when saveCustomerDetails() is called with valid customer details.',
      build: () => SaveCustomerBloc(firestore: fakeFirestore),
      act: (SaveCustomerBloc bloc) {
        return bloc.saveCustomerDetails(
          addressLine1,
          addressLine2,
          email,
          type,
          firstName,
          lastName,
          companyName,
          phoneNumber,
          secondaryPhoneNumber,
          landlineNumber,
        );
      },
      expect: () {
        return const [SaveCustomerLoading(), SaveCustomerSuccess()];
      },
    );
    // blocTest(
    //   'emits SaveCustomerFail() when saveCustomerDetails() is called with invalid customer details.',
    //   build: () => SaveCustomerBloc(firestore: fakeFirestore),
    //   act: (SaveCustomerBloc bloc) {
    //     return bloc.saveCustomerDetails(
    //       addressLine1,
    //       addressLine2,
    //       email,
    //       type,
    //       firstName,
    //       lastName,
    //       companyName,
    //       phoneNumber,
    //       secondaryPhoneNumber,
    //       landlineNumber,
    //     );
    //   },
    //   expect: () {
    //     return const [SaveCustomerFail('Invalid Customer Details.')];
    //   },
    // );

    blocTest(
      'emits SaveCustomerInitial() when reinitialize() is called.',
      build: () => SaveCustomerBloc(),
      act: (SaveCustomerBloc bloc) {
        return bloc.reinitialize();
      },
      expect: () {
        return const [SaveCustomerInitial()];
      },
    );
  });
}
