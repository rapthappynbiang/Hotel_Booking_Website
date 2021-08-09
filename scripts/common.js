generateHeaderUI();
generateFooterUI();
loginModal();
contactModal();
    function generateHeaderUI(){
         let headerInnerHtml = `<div class="image-responsive" id="logoContainer"><img src="assests/images/logo.png" alt="logo" id="logo-image" ></div>
                                <div class="btn btn-sm">
                                 <button id="loginBtn" type="button" class="btn btn-light  btn-sm" data-toggle="modal" data-target="#loginModal" onclick="clearLoginInput()">
                                    <span>LOGIN</span>
                                 </button>
                                 <button id="logoutBtn" type="button" class="btn btn-light  btn-sm" onclick="logout()" style="display:none">
                                 <span>LOGOUT</span>
                                 </button>
                                </div>`;

        document.getElementById("header").innerHTML = headerInnerHtml;
     }

     function generateFooterUI(){
        let footerInnerHtml = `<div class="btn  btn-sm">
                                    <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#contactUsModal">
                                        Contact Us
                                    </button>
                                </div>
                                <div class="copyright">
                                    <p>&copy; 2020 ROOM SEARCH PVT.LTD.</p>
                                </div>
                                <div class="contact-links">
                                    <a href="https://www.facebook.com" target="_blank">
                                        <img src="assests/images/facebook.png" class="social-media"></a>
                            
                                    <a href="https://www.instagram.com" target="_blank">
                                        <img src="assests/images/instagram.png" class="social-media"></a>

                                    <a href="https://twitter.com" target="_blank">
                                        <img src="assests/images/twitter.png" class="social-media"></a>
                                </div>`;

       document.getElementById("footer").innerHTML = footerInnerHtml;
    }

    function loginModal(){
        let loginModalInnerHtml = `<div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Please Login</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        <div class="modal-body">
                                        <form action="" mathod="">
                                            <div class="form-group row justify-content-around">
                                                <label class="col-sm-2 col-form-label" for="username">Username</label>
                                                <input required class="form-control col-sm-6" id="username" type="text" placeholder="Enter username">
                                            </div>

                                            <div class="form-group row text-center justify-content-around">
                                                <label class="col-sm-2 col-form-label" for="password">Password</label>
                                                <input required class="form-control col-sm-6" id="password" type="password" placeholder="Enter password">
                                            </div>
                                        </form>
                                        </div>
                                        <div class="modal-footer justify-content-center">
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="login()">Login</button>
                                        </div>
                                    </div>
                                    </div>`;

        document.getElementById("loginModal").innerHTML = loginModalInnerHtml;
    }

    function contactModal(){
        let contactModalInnerHtml = `<div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Get In Touch</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div>
                                                <p>Thank you for reaching out!!!</p>
                                                <p>Please enter you email we will get back to you.</p>
                                            </div>
                                            <form action="" method="">
                                            <div class="form-group row">
                                                <label class="col-sm-2 col-form-label" for="contactEmail">Email:</label>
                                                <input required class="form-control col-sm-6" id="contactEmail" type="email" placeholder="Enter your email id">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary">Submit</button>
                                        </div>
                                        </div>
                                    </div>`;

        document.getElementById("contactUsModal").innerHTML = contactModalInnerHtml;
    }

function clearLoginInput(){
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function login(){
    let userName = document.getElementById("username").value;
    let passWord = document.getElementById("password").value;
    if(userName == "admin" && passWord == "admin"){
        alert("Successfully loggedin");
        localStorage.setItem("userame", userName);
        localStorage.setItem("password", passWord);
        document.getElementById("logoutBtn").style.display = "block";
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("loginModal").style.display = "none"; 
        
        //Check if webpage is payment.html
        let currentPageHref = window.location.href.split("?");
        if( currentPageHref[0] == "http://127.0.0.1:5502/payment.html"){
            let payButton = document.getElementById("pay");
            payButton.classList.remove("disabled");
        }
    }
}

function logout(){
    localStorage.clear();
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "block";

     //Check if webpage is payment.html
     let currentPageHref = window.location.href.split("?");
     if( currentPageHref[0] == "http://127.0.0.1:5502/payment.html"){
        let payButton = document.getElementById("pay");
        payButton.classList.add("disabled");
     }
}

//Make logo image as link to index.html
if(window.location.href.split("?")[0] !== "http://127.0.0.1:5502/index.html"){
    document.getElementById("logo-image").addEventListener('click', function(){
        window.location.href = "http://127.0.0.1:5502/index.html";
    })
}