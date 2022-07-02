import React from 'react'
import { useCustomJavascript } from '@b2s_core/src/hooks/useCustomJavascript'

const HeaderTmpl = () => {
  useCustomJavascript(() => {
    
  })

  return (
    <header class="header">
      <div class="header__top">
          <div class="container">
              <div class="row justify-content-between">
                  <div class="col">Free shipment from $200</div>
                  <div class="col">Free 30 day returns on your order</div>
              </div>
          </div>
      </div>
      <div class="header__middle">
          <nav class="navbar navbar-expand-lg bg-light">
              <div class="container">
                  <a class="navbar-brand" href="#">
                      <img src="image/logo.svg" alt="logo" width="138" height="35" />
                  </a>
                  <ul class="nav nav-icon">
                      <li class="nav-item">
                          <a class="nav-link" href="#"><img src="image/search.svg" alt="Search" width="19" height="19" /></a>
                      </li>                        
                      <li class="nav-item">
                        <a class="nav-link" href="#"><img src="image/cart.svg" alt="Shopping Cart" width="19" height="19" /></a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#"><img src="image/avatar.svg" alt="Account" width="19" height="19" /></a>
                      </li>
                  </ul>                     
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>                    
                  <div class="collapse navbar-collapse navbar-menu" id="navbarMenu">
                      <div class="navbar-nav">
                          <a class="nav-link" href="#">Men</a>
                          <a class="nav-link" href="#">Women</a>
                          <a class="nav-link" href="#">Kids</a>
                      </div>
                  </div>
              </div>
          </nav>
      </div>
    </header>
  )
}

export default HeaderTmpl
