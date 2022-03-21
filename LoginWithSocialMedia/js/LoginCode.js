

window.fbAsyncInit = function () {
    FB.init({
        appId: '692896381738448',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v13.0'
    });
}

FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
});

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {
        // Logged into your webpage and Facebook.
        testAPI();
    }
    else {                                 // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log' + 'into this webpage.';
    }
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    window.location = "/Giphy";
    //FB.api('/me', function (response) {
    //    console.log(response);
    //    console.log('Successful login for: ' + response.name);
    //    document.getElementById('status').innerHTML ='Thanks for logging in, ' + response.name + '!';
    //    window.location = "/Giphy";

    //});
}

function Redirect() {
    window.location = "https://localhost:44363/Giphy";
}

//=========================Google Login Code====================

window.onload = function () {

    google.accounts.id.initialize({
        client_id: "206707121329-b4uq4j3de27no9bjnao91o2308996t4e.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.prompt();
};

function onSignIn(googleUser) {
    window.location = "/Giphy";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have been signed out successfully");
        $(".data").css("display", "none");
        $(".g-signin2").css("display", "block");
    });
}