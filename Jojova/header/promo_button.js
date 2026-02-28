<script type="text/javascript">
(function() {
    const interval = setInterval(() => {
        const headerActions = document.querySelector('.header__actions');
        const userIsLoggedIn = document.querySelector('.header__user') || document.querySelector('.user-info') || document.querySelector('.user-menu');
        
        if (headerActions && !userIsLoggedIn) {
            // CSS stilleri ekle
            const style = document.createElement('style');
            style.textContent = `
            /* Promo butonu gizle */
            .promo-button { display: none !important; }

            /* Header actions - basit yan yana */
            .header__actions { 
                display: flex !important; 
                gap: 5px !important; 
                align-items: center !important;
            }

            /* Desktop buton stilleri - Sidebar tarzı */
            .header__signin, .header__signup {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 10px !important;
                height: 46px !important;
                padding: 0 18px !important;
              margin: 0 !important;
              border-radius: 12px !important;
                color: var(--tf-tc) !important;
              text-decoration: none !important;
                font-size: 22px !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                line-height: 1 !important;
              white-space: nowrap !important;
                cursor: pointer !important;
                min-width: auto !important;
                width: auto !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                position: relative !important;
                overflow: hidden !important;
            }

            /* Giriş yap butonu - daha bold */
            .header__signin {
                border: 2px solid rgba(255, 229, 92, 0.2) !important;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
                box-shadow: 0 3px 12px rgba(255, 229, 92, 0.15) !important;
            }

            /* Giriş yap span - font size override */
            .header__signin span {
                display: block !important;
                color: var(--tf-tc) !important;
                font-size: 22px !important;
                text-transform: uppercase !important;
                font-weight: 700 !important;
                transition: color .4s ease !important;
            }

            /* Kayıt ol butonu - bonus talep tarzı */
            .header__signup {
                background: linear-gradient(135deg, #FFE55C 0%, #FFA500 100%) !important;
                border: 1px solid rgba(255, 229, 92, 0.3) !important;
                color: #000000 !important;
                box-shadow: 0 4px 15px rgba(255, 229, 92, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
                position: relative !important;
            }

            /* Kayıt ol - glow efekti */
            .header__signup::after {
                content: '' !important;
                position: absolute !important;
                top: -2px !important;
                left: -2px !important;
                right: -2px !important;
                bottom: -2px !important;
                background: linear-gradient(45deg, #FFE55C, #FFA500, #FFE55C) !important;
                border-radius: 14px !important;
                z-index: -1 !important;
                filter: blur(8px) !important;
                opacity: 0 !important;
                transition: opacity 0.3s ease !important;
            }

            /* Desktop hover efekti - Giriş yap */
            .header__signin:hover {
                border-color: rgba(255, 229, 92, 0.4) !important;
                background: linear-gradient(135deg, rgba(255, 229, 92, 0.08) 0%, rgba(255, 229, 92, 0.04) 100%) !important;
                color: #ffffff !important;
                transform: translateY(-3px) !important;
                box-shadow: 0 10px 30px rgba(255, 229, 92, 0.3) !important;
            }

            /* Desktop hover efekti - Kayıt ol */
            .header__signup:hover {
                background: linear-gradient(135deg, #FFED4A 0%, #FFB84D 100%) !important;
                transform: translateY(-3px) !important;
                box-shadow: 0 10px 30px rgba(255, 229, 92, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
                border-color: rgba(255, 229, 92, 0.5) !important;
            }

            /* Kayıt ol hover glow */
            .header__signup:hover::after {
                opacity: 1 !important;
            }

            /* Kayıt ol - pulse animasyonu */
            @keyframes pulseGlow {
                0% { 
                    box-shadow: 0 4px 15px rgba(255, 229, 92, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }
                50% { 
                    box-shadow: 0 6px 20px rgba(255, 229, 92, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4);
                }
                100% { 
                    box-shadow: 0 4px 15px rgba(255, 229, 92, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }
            }

            .header__signup {
                animation: pulseGlow 2s infinite ease-in-out !important;
            }

            /* Desktop icon'lar - mask ile */
            .header__signin::before {
                content: "" !important;
                background-color: #FFE55C !important;
              width: 24px !important;
              height: 24px !important;
                display: inline-block !important;
                margin-right: 8px !important;
                flex-shrink: 0 !important;
                -webkit-mask: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/RkZDEmpclHrP6YwfPWcXjY0lDhU0lMtK3ZwYWeMr.svg') no-repeat center !important;
              -webkit-mask-size: 24px 24px !important;
                mask: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/RkZDEmpclHrP6YwfPWcXjY0lDhU0lMtK3ZwYWeMr.svg') no-repeat center !important;
              mask-size: 24px 24px !important;
                transition: transform 0.3s ease !important;
                filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3)) !important;
            }

            .header__signup::before {
                content: "" !important;
                background-color: #000000 !important;
                width: 22px !important;
                height: 22px !important;
                display: inline-block !important;
                margin-right: 6px !important;
              flex-shrink: 0 !important;
                -webkit-mask: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/WkRzEpsFEVlYbEwIwEVNEeVuYkkzOHmBVy5pXIyh.svg') no-repeat center !important;
                -webkit-mask-size: 22px 22px !important;
                mask: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/WkRzEpsFEVlYbEwIwEVNEeVuYkkzOHmBVy5pXIyh.svg') no-repeat center !important;
                mask-size: 22px 22px !important;
                transition: transform 0.3s ease !important;
                animation: iconBounce 2.5s infinite ease-in-out !important;
            }

            /* SVG animasyonları - desktop */
            @keyframes iconBounce {
                0%, 100% { 
                    transform: translateY(0px) scale(1);
                }
                50% { 
                    transform: translateY(-2px) scale(1.02);
                }
            }

            /* Hover'da iconları büyüt */
            .header__signin:hover::before {
                transform: scale(1.1) !important;
            }

            .header__signup:hover::before {
                transform: scale(1.1) !important;
                background-color: #000000 !important;
            }

            /* Shine efekti - sadece giriş yap için */
            .header__signin::after {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent) !important;
                transition: left 0.6s ease !important;
                z-index: 1 !important;
            }

            .header__signin:hover::after {
                left: 100% !important;
            }

            /* Mobil - yazılı butonlar */
            @media (max-width: 767px) {
                .header__actions { 
                    gap: 6px !important; 
                }

                .header__signin, .header__signup {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    height: 50px !important;
                    padding: 0 14px !important;
                    font-size: 15px !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    border-radius: 8px !important;
                    gap: 6px !important;
                    min-width: 110px !important;
                    width: auto !important;
                    white-space: nowrap !important;
                }

                /* Mobilde giriş yap - sadece icon */
                .header__signin {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
                    border: 1px solid rgba(255, 229, 92, 0.1) !important;
                    color: var(--tf-tc) !important;
                    width: 50px !important;
                    min-width: 50px !important;
                    max-width: 50px !important;
                    height: 50px !important;
                    padding: 0 !important;
                    gap: 0 !important;
                    justify-content: center !important;
                    align-items: center !important;
                    overflow: hidden !important;
                }

                /* Mobilde giriş yap yazısını tamamen gizle */
                .header__signin span {
                    display: none !important;
                    visibility: hidden !important;
                    width: 0 !important;
                    height: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }

                /* Giriş yap text elementini tamamen kaldır */
                .header__signin::after {
                    display: none !important;
                }

                /* Mobilde kayıt ol - web stilinde */
                .header__signup {
                    background: linear-gradient(135deg, #FFE55C 0%, #e6ad00 100%) !important;
                    border: 2px solid #FFE55C !important;
                    color: #000000 !important;
                    box-shadow: 
                        0 4px 12px rgba(255, 193, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
                    position: relative !important;
                    overflow: hidden !important;
                    animation: none !important;
                }

                /* Mobilde kayıt ol - shine efekti */
                .header__signup::after {
                    content: '' !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: -100% !important;
                    width: 100% !important;
                    height: 100% !important;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) !important;
                    animation: mobileShine 3s infinite !important;
                    z-index: 1 !important;
                }

                @keyframes mobileShine {
                    0% { left: -100%; }
                    50% { left: 100%; }
                    100% { left: 100%; }
                }

                /* Mobil iconlar - 20px uniform with animation */
                .header__signin::before {
                    content: "" !important;
                    width: 20px !important;
                    height: 20px !important;
                    margin-right: 0 !important;
                    flex-shrink: 0 !important;
                    /* Mask yerine data-URI SVG kullan */
                    -webkit-mask: none !important;
                    mask: none !important;
                    background-color: transparent !important;
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffc100"><path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/></svg>') !important;
                    background-repeat: no-repeat !important;
                    background-position: center !important;
                    background-size: 20px 20px !important;
                    display: inline-block !important;
                }

                .header__signup::before {
                    content: "" !important;
                    width: 20px !important;
                    height: 20px !important;
                    -webkit-mask-size: 20px 20px !important;
                    mask-size: 20px 20px !important;
                    margin-right: 8px !important;
                    flex-shrink: 0 !important;
                    transition: transform 0.3s ease !important;
                    animation: iconPulse 2s infinite ease-in-out !important;
                    background-color: #000000 !important;
                    -webkit-mask: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/WkRzEpsFEVlYbEwIwEVNEeVuYkkzOHmBVy5pXIyh.svg') no-repeat center !important;
                    mask: url('https://vendor-provider.fra1.cdn.digitaloceanspaces.com/ebetlab/ep3YGM2vykm19eefqTFkF0LvamjEEULx/mini-sliders/WkRzEpsFEVlYbEwIwEVNEeVuYkkzOHmBVy5pXIyh.svg') no-repeat center !important;
                    display: inline-block !important;
                    z-index: 2 !important;
                }

                /* SVG animasyonları - mobil */
                @keyframes iconPulse {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: scale(1.05);
                        opacity: 0.9;
                    }
                }

                /* Mobil hover */
                .header__signin:hover {
                    background: linear-gradient(135deg, rgba(255, 229, 92, 0.08) 0%, rgba(255, 229, 92, 0.04) 100%) !important;
                    border-color: rgba(255, 229, 92, 0.3) !important;
                    color: #ffffff !important;
                }

                .header__signup:hover {
                    background: linear-gradient(135deg, #FFED4A 0%, #FFB84D 100%) !important;
                    box-shadow: 0 4px 15px rgba(255, 229, 92, 0.3) !important;
                    transform: translateY(-1px) !important;
                }

                /* Mobilde glow efektini kapat */
                .header__signup::after {
                    display: none !important;
                }
            }
            `;
            document.head.appendChild(style);

            // Metin ekle - iconlar CSS'te
            const signinBtn = headerActions.querySelector('.header__signin');
            const signupBtn = headerActions.querySelector('.header__signup');

            if (signinBtn) {
                signinBtn.innerHTML = '<span>Giriş Yap</span>';
            }

            if (signupBtn) {
                signupBtn.innerHTML = '<span>Kayıt Ol</span>';
            }

            clearInterval(interval);
        }
    }, 100);
})();
</script>