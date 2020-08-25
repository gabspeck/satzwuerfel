<script>
  import 'firebaseui/dist/firebaseui.css';
  import * as firebase from 'firebase/app';
  import * as firebaseui from 'firebaseui';
  import { onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';

  onMount(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebase-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult() {
          replace('/');
          return false;
        }
      },
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
    });
  });

</script>
<h1 class="title">Anmelden</h1>
<div id="firebase-auth-container">

</div>