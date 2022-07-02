import React from 'react'
import { useCustomJavascript } from '@b2s_core/src/hooks/useCustomJavascript'

const FooterTmpl = () => {
  useCustomJavascript(() => {

  })

  return (
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-6 footer__about">
                    <div class="footer__logo">
                        <a href="#">
                            <img src="image/logo.svg" alt="logo" width="138" height="35" />
                        </a>
                    </div>
                    <div class="footer__about-desc">
                        House My Brand designs clothing for the young, the old & everyone in between – but most importantly, for the fashionable
                    </div>
                    <ul class="list-unstyled footer__socials">
                        <li><a href="#"><img src="image/fb.svg" alt="facebook" target="new" width="10" height="18" /></a></li>
                        <li><a href="#" target="new"><img src="image/twiter.svg" alt="" target="new" width="20" height="16" /></a></li>
                        <li><a href="#" target="new"><img src="image/linkedIn.svg" alt="" target="new" width="17" height="15" /></a></li>
                        <li><a href="#" target="new"><img src="image/instagram.svg" alt="" target="new" width="18" height="18" /></a></li>
                        <li><a href="#" target="new"><img src="image/youtube.svg" alt="" target="new" width="20" height="14" /></a></li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 col-lg-2 footer__nav">
                    <div class="footer__title">Shopping online</div>
                    <ul class="list-unstyled">
                        <li><a href="#">Order Status</a></li>
                        <li><a href="#">Shipping and Delivery</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Payment Options</a></li>
                        <li><a href="#">Contact Us</a></li>  
                    </ul>
                </div>
                <div class="col-12 col-md-4 col-lg-2 footer__nav">
                    <div class="footer__title">Information</div>
                    <ul class="list-unstyled">
                        <li><a href="#">Cards</a></li>
                        <li><a href="#">Find a store</a></li>
                        <li><a href="#">Newsletter</a></li>
                        <li><a href="#">Bacome a member</a></li>
                        <li><a href="#">Site feedback</a></li>                                                
                    </ul>
                </div>
                <div class="col-12 col-md-4 col-lg-2 footer__nav footer__contact">
                    <div class="footer__title">Contact</div>
                    <ul class="list-unstyled">
                        <li>store@uikit.com</li>
                        <li>Hotline: <a href="tel:+1131138138">+1 131 138 138</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer__copyright">Design by iceo.co - © 2019. All rights reserved.</div>
        <div class="modal fade" id="sizeModal" tabindex="-1" aria-labelledby="sizeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="sizeModalLabel">Size table</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                </div>
            </div>
        </div>
        <script src="js/bootstrap/bootstrap.bundle.min.js"></script>
        <script src="js/swiper/swiper-bundle.min.js"></script>
        <script src="js/main.js"></script>
    </footer>
  )
}

export default FooterTmpl