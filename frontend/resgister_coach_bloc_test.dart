import 'package:bloc_test/bloc_test.dart';

void main() {
  group('RegisterTechnicianBloc()', () {
    final user = MockUser(
      uid: '2',
      email: 'admin@gmail.com',
      displayName: 'admin',
    );

    String fullName = 'test technician';
    String contactNumber = '09564321867';
    String designation = 'test designation';
    String address = 'test address';
    String personalEmail = 'personalemail@gmail.com';
    String status = 'Active';
    String activityStatus = 'On the Way';

    String failMessage = 'Invalid inputs.';
    String successMessage = 'Register success.';

    final fakeFirebaseAuth = MockFirebaseAuth(mockUser: user);
    final fakeFirestore = FakeFirebaseFirestore();

    blocTest(
      'emits [] when nothing is added.',
      build: () => RegisterTechnicianBloc(),
      expect: () => [],
    );

    // blocTest(
    //   'emits RegisterTechnicianSuccess when saveTechnicianDetails() is called and the user credentials are valid.',
    //   build: () => RegisterTechnicianBloc(
    //     firebaseAuth: fakeFirebaseAuth,
    //     firestore: fakeFirestore,
    //   ),
    //   act: (RegisterTechnicianBloc bloc) {
    //     return bloc.saveTechnicianDetails(
    //       fullName,
    //       contactNumber,
    //       designation,
    //       address,
    //       personalEmail,
    //       status,
    //       activityStatus,
    //     );
    //   },
    //   expect: () {
    //     return [
    //       RegisterTechnicianLoading(),
    //       RegisterTechnicianSuccess(successMessage)
    //     ];
    //   },
    // );

    blocTest('emits RegisterTechnicianinitial when reinitialize() is called.',
        build: () => RegisterTechnicianBloc(
            firestore: fakeFirestore, firebaseAuth: fakeFirebaseAuth),
        act: (RegisterTechnicianBloc bloc) {
          return bloc.reinitialize();
        },
        expect: () {
          return [RegisterTechnicianInitial()];
        });
  });
}
