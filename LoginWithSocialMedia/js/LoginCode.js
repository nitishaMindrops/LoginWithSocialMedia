var isFacebookLoggedIn = null;
var isGoogleLoggedIn = null;

window.fbAsyncInit = function () {
    FB.init({
        appId: '692896381738448',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v13.0'
    });

    FB.getLoginStatus(function (response) {   
        statusChangeCallback(response);        
    });
   
 };

function fbLogout(accessToken) {

    FB.logout(function (response) {
        // user is now logged out
        window.location ="/Index";
    });
}

function statusChangeCallback(response) {  
                     
    if (response.status === 'connected') {

        window.location = "/Giphy";

    }
    
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
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

function GoogleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
}



function Logout(){
    if (isGoogleLoggedIn == true) {
        GoogleSignOut();
    }
    else if (isFacebookLoggedIn == true) {
        fbLogout();
    }
};