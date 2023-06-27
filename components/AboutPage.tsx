import {
  faArrowTurnUp,
  faFloppyDisk,
  faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import Container from 'components/BlogContainer';
import BlogHeader from 'components/BlogHeader';
import Layout from 'components/BlogLayout';
import IndexPageHead from 'components/IndexPageHead';
import type { Settings } from 'lib/sanity.queries';
import { useEffect, useState } from 'react';

import styles from './AboutPage.module.css';
import BlogFooter from './BlogFooter';
import SectionSeparator from './SectionSeparator';

export interface IndexPageProps {
  preview?: boolean;
  loading?: boolean;
  settings: Settings;
}

export default function AboutPage(props: IndexPageProps) {
  const { preview, loading, settings } = props;
  const { title, description, admin } = settings;

  const [
    showDeviceOrientationCTA,
    setShowDeviceOrientationCTA,
  ] = useState(false);

  useEffect(() => {
    const processDeviceViewportSize = (orientation: Pick<MediaQueryList, 'matches'>) => {
      if (orientation.matches && window.innerHeight < 640) {
        // Landscape mode on a narrow device - prompt user to put the device in portrait mode.
        setShowDeviceOrientationCTA(true);
      } else {
        setShowDeviceOrientationCTA(false);
      }
    };
    const landscapeOrientation = window.matchMedia('(orientation: landscape)');

    // Chrome iOS does not fire layout change events; Safari iOS does not fire
    // window resize events on layout changes; we need to bind event handlers
    // for both to have everything covered:
    processDeviceViewportSize(landscapeOrientation);
    landscapeOrientation.onchange = (event) => {
      processDeviceViewportSize(event);
    };
    window.onresize = () => {
      processDeviceViewportSize(landscapeOrientation);
    };



    const latestRolesTimeline = document.getElementById(
      'latest-roles-timeline'
    );
    const companyLogos = [
      ...latestRolesTimeline.querySelectorAll('[data-company]'),
    ];
    const tgCompanyLogo = companyLogos.find(
      (logo) => logo.dataset.company === 'tg'
    );
    const twCompanyLogo = companyLogos.find(
      (logo) => logo.dataset.company === 'tw'
    );
    const wfCompanyLogo = companyLogos.find(
      (logo) => logo.dataset.company === 'wf'
    );
    const olderCompanyLogo = companyLogos.find(
      (logo) => logo.dataset.company === 'older'
    );

    const latestRolesContainer = document.getElementById(
      'latest-roles-container'
    );
    const roleItems = [
      ...latestRolesContainer.querySelectorAll('[data-company]'),
    ];

    let scrollTimeout;

    latestRolesContainer.onscroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const containerTop = latestRolesContainer.offsetTop;
        const containerScrollTop = latestRolesContainer.scrollTop;
        const containerBottom =
          containerScrollTop + latestRolesContainer.offsetHeight;

        const visibleRole = roleItems.find((item) => {
          const roleContainerTop = item.offsetTop - containerTop;
          const roleContainerBottom = roleContainerTop + item.offsetHeight;

          return (
            roleContainerTop >= containerScrollTop &&
            roleContainerBottom <= containerBottom
          );
        });

        if (visibleRole) {
          if (visibleRole.dataset.company === 'tg') {
            // 1st company can never be inactive but consistency:
            tgCompanyLogo.classList.remove(styles.postActive, styles.inactive);
            tgCompanyLogo.classList.add(styles.active);

            twCompanyLogo.classList.remove(styles.postActive, styles.active);
            twCompanyLogo.classList.add(styles.inactive);
            wfCompanyLogo.classList.remove(styles.postActive, styles.active);
            wfCompanyLogo.classList.add(styles.inactive);
            olderCompanyLogo.classList.remove(styles.postActive, styles.active);
            olderCompanyLogo.classList.add(styles.inactive);
          } else if (visibleRole.dataset.company === 'tw') {
            tgCompanyLogo.classList.remove(styles.active);
            tgCompanyLogo.classList.add(styles.postActive);

            twCompanyLogo.classList.remove(styles.postActive, styles.inactive);
            twCompanyLogo.classList.add(styles.active);

            wfCompanyLogo.classList.remove(styles.postActive, styles.active);
            wfCompanyLogo.classList.add(styles.inactive);
            olderCompanyLogo.classList.remove(styles.postActive, styles.active);
            olderCompanyLogo.classList.add(styles.inactive);
          } else if (visibleRole.dataset.company === 'wf') {
            tgCompanyLogo.classList.remove(styles.active);
            tgCompanyLogo.classList.add(styles.postActive);
            twCompanyLogo.classList.remove(styles.active, styles.inactive);
            twCompanyLogo.classList.add(styles.postActive);

            wfCompanyLogo.classList.remove(styles.postActive, styles.inactive);
            wfCompanyLogo.classList.add(styles.active);

            olderCompanyLogo.classList.remove(styles.postActive, styles.active);
            olderCompanyLogo.classList.add(styles.inactive);
          } else if (visibleRole.dataset.company === 'older') {
            tgCompanyLogo.classList.remove(styles.active);
            tgCompanyLogo.classList.add(styles.postActive);
            twCompanyLogo.classList.remove(styles.active, styles.inactive);
            twCompanyLogo.classList.add(styles.postActive);
            wfCompanyLogo.classList.remove(styles.active, styles.inactive);
            wfCompanyLogo.classList.add(styles.postActive);

            // last company can never be postActive but consistency
            olderCompanyLogo.classList.remove(
              styles.postActive,
              styles.inactive
            );
            olderCompanyLogo.classList.add(styles.active);
          }
        }
      }, 200);
    };

    return () => {
      landscapeOrientation.onchange = null;
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <IndexPageHead settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader
            title={title}
            description={description}
            admin={admin}
            level={1}
            activeLink={'about'}
          />
          <article className={styles.aboutArticle}>
            <section>
              <h1>Intro section</h1>
              <p>
                Lorem ipsum dolor sit amet. Est maiores aliquid
                <a href="https://www.loremipzum.com" target="_blank">
                  At sunt et praesentium consequatur qui corrupti ullam
                </a>
                et reiciendis asperiores ut distinctio dolorem. Et repellendus
                obcaecati aut repudiandae enimea voluptatem qui praesentium
                corporis. Qui voluptas rerum et nihil repudiandaeEos rerum 33
                quibusdam vitae qui similique veniam et illo magni. Aut voluptas
                architecto est eaque earumEos maiores et facere saepe et labore
                porro et ratione fugiat.
              </p>
              <p>
                Eos voluptas excepturi
                <a href="https://www.loremipzum.com" target="_blank">
                  Est quae a unde veniam vel temporibus similique
                </a>
                ut aliquam laudantium qui labore magnam aut quidem minima. Aut
                nulla atqueUt iste aut quisquam eveniet et perspiciatis dicta.
                Qui officiis harum aut omnis quamEum vero qui nisi dolorem sed
                illum voluptatem ex dolor officia ut omnis veritatis. Qui
                quaerat doloremVel iure At quasi natus in consequatur voluptas
                33 dolores laborum ut accusantium atque.
              </p>
              <p>
                Et esse earum
                <a href="https://www.loremipzum.com" target="_blank">
                  Id aliquid eos ipsa numquam quo doloremque necessitatibus
                </a>
                aut ullam veritatis. Ut velit maxime non natus minimaAd fugit
                eos porro tenetur rem quod nobis est nulla voluptatem.
              </p>
            </section>
            <SectionSeparator />
            <section>
              <h1>Latest roles</h1>
              <div
                className={
                  cn('-mt-12 -mb-12 grid grid-cols-12 ' +
                    'gap-x-0.5 md:gap-x-3.5 lg:gap-x-5', {
                    'hidden': showDeviceOrientationCTA,
                  })
                }
              >
                <div className={'self-center'}>
                  <div
                    id={'latest-roles-timeline'}
                    className={
                      'col-span-1 grid grid-flow-col grid-cols-1 grid-rows-6 ' +
                        `justify-items-center gap-y-28 ${styles.latestRolesTimeline}`
                    }
                  >
                    <div
                      className={
                        'relative -z-10 col-start-1 row-span-6 row-start-1 ' +
                          'h-4/5 w-0.5 place-self-center bg-slate-200'
                      }
                    ></div>
                    <div
                      data-company={'tg'}
                      className={`col-start-1 row-span-1 row-start-2 
                        ${styles.company} ${styles.active} ${styles.firstCompany}`}
                    />
                    <div
                      data-company={'tw'}
                      className={`col-start-1 row-span-1 row-start-3 
                        ${styles.company} ${styles.inactive} ${styles.secondCompany}`}
                    />
                    <div
                      data-company={'wf'}
                      className={`col-start-1 row-span-1 row-start-4 
                        ${styles.company} ${styles.inactive} ${styles.thirdCompany}`}
                    />
                    <div
                      data-company={'older'}
                      className={`col-start-1 row-span-1 row-start-5 grid place-items-center 
                        leading-[0px]
                        ${styles.company} ${styles.inactive} ${styles.fourthCompany}`}
                    >
                      <FontAwesomeIcon
                        icon={faFloppyDisk}
                        width={25}
                        height={25}
                        inverse
                      />
                    </div>
                  </div>
                </div>
                <div
                  id={'latest-roles-container'}
                  className={
                    'col-span-11 place-self-center ' +
                      'h-[640px] gap-y-5 space-y-5 overflow-auto px-2 ' +
                      'snap-y snap-mandatory scroll-smooth ' +
                      'bg-stripes rounded shadow-inner'
                  }
                >
                  <div className={styles.topShadow} />
                  <div
                    data-company={'tg'}
                    className={`${styles.roleContainer} snap-center`}
                  >
                    <div>
                      <h2>Tarabut Gateway</h2>
                      <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                      <p className={'my-2 text-xs text-slate-400 md:text-sm'}>
                        Jan 2022 - Present
                      </p>
                    </div>
                    <div className={'grow'}>
                      <p>
                        Lorem ipsum dolor sit amet. Qui rerum nisi in optio sunt
                        qui excepturi galisum ab eaque praesentium id accusamus
                        voluptatem ab voluptates libero. Ut pariatur placeat non
                        dolorem quas cum illo ipsum. Est dolorem velit ut pariatur
                        laboriosam et enim Quis id nostrum omnis est quaerat iure
                        quo itaque exercitationem quo quaerat ipsam. Sit quia
                        delectus aut unde quia ea rerum maxime.
                      </p>
                      <p>
                        Et accusamus explicabo eos laborum tenetur qui modi dolore
                        eos blanditiis cumque sed velit minus. Est soluta maxime
                        et consequatur dignissimos et nulla eius sit voluptate
                        labore aut quia excepturi!
                      </p>
                      <p>
                        Eos labore sunt est galisum natus et odit saepe ab
                        doloremque facere id commodi eveniet sit nemo rerum ut
                        perspiciatis neque! Et ratione quod sit similique
                        voluptatem est dolorem laborum qui laborum quae! Et fuga
                        nemo ad voluptas facilis est molestias culpa in laudantium
                        quia sed incidunt accusantium sit temporibus ratione!
                      </p>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div
                    data-company={'tw'}
                    className={`${styles.roleContainer} snap-center`}
                  >
                    <div>
                      <h2>/thoughtworks</h2>
                      <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                      <p className={'my-2 text-xs text-slate-400 md:text-sm'}>
                        Sep 2018 - Dec 2021
                      </p>
                    </div>
                    <div className={'grow'}>
                      <p>
                        Et ipsa debitis sit eveniet odit vel modi dignissimos vel
                        quibusdam sint est consectetur soluta non itaque
                        necessitatibus. Ea incidunt consequuntur et voluptatem
                        tempore et nisi magnam ab perspiciatis blanditiis qui
                        temporibus rerum ut nisi ipsum. Sit autem nulla qui omnis
                        pariatur ut perspiciatis nobis eum nisi voluptate.
                      </p>
                      <p>
                        Eos labore sunt est galisum natus et odit saepe ab
                        doloremque facere id commodi eveniet sit nemo rerum ut
                        perspiciatis neque! Et ratione quod sit similique
                        voluptatem est dolorem laborum qui laborum quae! Et fuga
                        nemo ad voluptas facilis est molestias culpa in laudantium
                        quia sed incidunt accusantium sit temporibus ratione! Sed
                        dolore perferendis quo consequatur esse aut fugit facilis
                        et ipsam nesciunt ut officiis voluptatem sed excepturi
                        illum.
                      </p>
                      <p>
                        Eos labore sunt est galisum natus et odit saepe ab
                        doloremque facere id commodi eveniet sit nemo rerum ut
                        perspiciatis neque! Et ratione quod sit similique
                        voluptatem est dolorem laborum qui laborum quae!
                      </p>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div
                    data-company={'wf'}
                    className={`${styles.roleContainer} snap-center`}
                  >
                    <div>
                      <h2>World First</h2>
                      <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                      <p className={'my-2 text-xs text-slate-400 md:text-sm'}>
                        Dec 2017 - Aug 2018
                      </p>
                    </div>
                    <div className={'grow'}>
                      <p>
                        Sit dolor debitis et quam totam ea veniam quaerat aut
                        repudiandae harum quo nihil inventore. Qui galisum
                        repellendus sit internos consectetur qui iste incidunt id
                        dolorem repellendus. Et maxime consequuntur eos
                        consequatur ratione et incidunt cumque. In asperiores
                        provident ab facilis quia ut corrupti consectetur cum
                        aspernatur soluta et minus corporis et voluptate ipsa.
                      </p>
                      <p>
                        Qui autem veritatis sed deleniti porro qui nihil eligendi.
                        Ut illum similique id quos itaque sed quos dolore in harum
                        voluptas et dolor ipsum ut quia laboriosam.
                      </p>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div
                    data-company={'older'}
                    className={`${styles.roleContainer} snap-center`}
                  >
                    <div>
                      <h2>Older roles</h2>
                      <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                      <p className={'my-2 text-xs text-slate-400 md:text-sm'}>
                        5 - 10 years ago
                      </p>
                    </div>
                    <div className={'grow'}>
                      <p>
                        Sit dolor debitis et quam totam ea veniam quaerat aut
                        repudiandae harum quo nihil inventore. Qui galisum
                        repellendus sit internos consectetur qui iste incidunt id
                        dolorem repellendus. Et maxime consequuntur eos
                        consequatur ratione et incidunt cumque. In asperiores
                        provident ab facilis quia ut corrupti consectetur cum
                        aspernatur soluta et minus corporis et voluptate ipsa.
                      </p>
                      <p>
                        Qui autem veritatis sed deleniti porro qui nihil eligendi.
                        Ut illum similique id quos itaque sed quos dolore in harum
                        voluptas et dolor ipsum ut quia laboriosam.
                      </p>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div className={styles.bottomShadow} />
                </div>
              </div>
              {
                showDeviceOrientationCTA &&
                <div className={'h-64 grid grid-cols-1 place-items-center bg-slate-200 rounded'}>
                  <div className={'relative h-10 w-10'}>
                    <div className={'absolute left-0 bottom-3 overflow-hidden animate-reveal-bottom-up'}>
                      <FontAwesomeIcon
                        icon={faArrowTurnUp}
                        width={15}
                        height={15}
                        flip={'horizontal'}
                      />
                    </div>
                    <div className={'absolute right-0 bottom-0'}>
                      <FontAwesomeIcon
                        icon={faMobileScreen}
                        width={25}
                        height={25}
                        className={'text-5xl animate-spin-quarter'}
                      />
                    </div>
                  </div>
                </div>
              }
            </section>
            <SectionSeparator />
            <section>
              <h1>Outro section</h1>
              <p>
                Lorem ipsum dolor sit amet. Sit quis internos eos corporis
                voluptas At numquam reprehenderit et tempora numquam. Sit quam
                vero nam reprehenderit rerum aut autem laudantium sit enim omnis
                qui quos voluptatem.
              </p>
              <p>
                Et enim delectus et ullam atque quo laborum sint quo officiis
                voluptatem vel molestias blanditiis. Eum tenetur cumque id
                aspernatur internos ut deserunt perferendis.
              </p>
            </section>
          </article>
          <BlogFooter admin={settings.admin} activeLink={'about'} />
        </Container>
      </Layout>
    </>
  );
}
