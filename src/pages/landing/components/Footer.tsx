import LogoGray from '../assets/logo-gray.svg'
import EmailIcon from '../assets/footer-icon-mail.png'
import BuildingIcon from '../assets/footer-icon-building.png'

const footerItems = ['Home', 'Solutions', 'Support', 'Contact']

export function Footer() {
  return (
    <section className=" bg-[#05011D]">
      <div className="relative max-w-[1920px] mx-auto pt-17.5 pb-15">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex justify-between items-start pt-7.5 mb-30 border-t border-[#7A7A7B]/30">
            <img
              src={LogoGray}
              alt="AISIMS 로고 회색"
              className="h-auto w-[180px]"
            />

            {/* <div className="flex flex-row gap-8 md:gap-12 lg:gap-20"> */}
            <div className="flex gap-20">
              {footerItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex text-base font-bold text-neutral-100/50 leading-[150%] hover:cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-end text-[#666A6D]">
            <div>
              <p className="mb-4 font-bold">Contact Info</p>
              <p className="flex items-center text-base leading-[150%]">
                <img src={EmailIcon} className="w-4 mr-2.5" />
                contact@aisims.com
              </p>
              <p className="flex items-center text-base leading-[150%]">
                <img src={BuildingIcon} className="w-4 mr-2.5" />
                #1314, #1315, 53, Sinwon-ro 250 beon-gil, Yeongtong-gu,
                Suwon-si, Gyeonggi-do, Republic Korea
              </p>
            </div>

            <div className="text-[14px]">© 2025 AISIMS All rights reserved</div>
          </div>
        </div>
      </div>
    </section>
  )
}
