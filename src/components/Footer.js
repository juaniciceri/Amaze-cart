import React from 'react';

function Footer({user}){

return(
    <div className={`${user?'login':'footer-align'}`}>
        <center>
        <h6 className="footer-contact">57 + 317 4894599</h6>
        <h6 className="footer-site">© 2020-2021</h6>
        </center>
    </div>
)
}
export default Footer;
