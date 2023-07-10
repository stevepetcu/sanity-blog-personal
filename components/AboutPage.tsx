{/* eslint-disable react/no-unescaped-entities */}
import {
  faArchive,
  faArrowTurnUp,
  faCircleInfo,
  faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import Container from 'components/BlogContainer';
import BlogHeader from 'components/BlogHeader';
import Layout from 'components/BlogLayout';
import IndexPageHead from 'components/IndexPageHead';
import { differenceInMonths } from 'date-fns';
import type { AboutIntroPhoto, Settings } from 'lib/sanity.queries';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { PixelRatioContext } from '../contexts/PixelRatioContext';
import { urlForImage } from '../lib/sanity.image';
import { PAGE_POSTS_PATH } from '../pages/posts';
import styles from './AboutPage.module.css';
import BlogFooter from './BlogFooter';
import { IconHr } from './IconHr';
import LinkExternal from './LinkExternal';
import SanePortableText from './SanePortableText';
import SectionSeparator from './SectionSeparator';

export interface IndexPageProps {
  preview?: boolean;
  loading?: boolean;
  settings: Settings;
  aboutIntroPhotos: AboutIntroPhoto[];
}

// TODO: extract the imgPlaceholder and toBase64
const imgPlaceholder = (w: number, h: number) => `
<svg width='${w}' 
  height='${h}' 
  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
  <defs>
    <linearGradient id='g'>
      <stop stop-color='#6366f1' offset='10%' stop-opacity='0.4' />
      <stop stop-color='#0ea4e9' offset='40%' stop-opacity='0.5' />
      <stop stop-color='#10b981' offset='90%' stop-opacity='0.4' />
    </linearGradient>
  </defs>
  <rect id='r' width='${w}' height='${h}' fill='url(#g)' />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default function AboutPage(props: IndexPageProps) {
  const INTRO_PHOTO_ASPECT_RATIO = 2 / 3;
  const INTRO_PHOTO_HEIGHT = 900;
  const INTRO_PHOTO_WIDTH = Math.ceil(
    INTRO_PHOTO_HEIGHT * INTRO_PHOTO_ASPECT_RATIO
  );
  const TODAY = new Date();

  const pixelRatio = React.useContext(PixelRatioContext);

  const { preview, loading, settings } = props;
  const { title, description, admin } = settings;

  const [showPhotoCaptionAtIndex, setShowPhotoCaptionAtIndex] = useState(-1);
  const [showPhotoCaptionTimeout, setShowPhotoCaptionTimeout] = useState<
    undefined | ReturnType<typeof setTimeout>
  >();
  const showFigCaptionAtIndex = (index: number) => {
    clearTimeout(showPhotoCaptionTimeout);
    setShowPhotoCaptionTimeout(
      setTimeout(() => {
        setShowPhotoCaptionAtIndex(-1);
        clearTimeout(showPhotoCaptionTimeout);
      }, 12000)
    );

    if (showPhotoCaptionAtIndex === index) {
      setShowPhotoCaptionAtIndex(-1);
    } else {
      setShowPhotoCaptionAtIndex(index);
    }
  };

  const hideFigCaptionAtIndex = (index: number) => {
    clearTimeout(showPhotoCaptionTimeout);

    if (showPhotoCaptionAtIndex === index) {
      setShowPhotoCaptionAtIndex(-1);
    }
  };

  const [showDeviceOrientationCTA, setShowDeviceOrientationCTA] =
    useState(false);

  useEffect(() => {
    const processDeviceViewportSize = (
      orientation: Pick<MediaQueryList, 'matches'>
    ) => {
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
    ] as HTMLElement[];
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
    ] as HTMLElement[];

    let scrollTimeout;

    latestRolesContainer.onscroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const containerTop = latestRolesContainer.offsetTop;
        const containerScrollTop = latestRolesContainer.scrollTop;
        const containerBottom =
          containerScrollTop + latestRolesContainer.offsetHeight;

        const visibleRole = roleItems.find((item: HTMLElement) => {
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
            level={2}
            activeLink={'about'}
          />
          <article className={styles.aboutPage}>
            <section>
              <h1>Intro</h1>
              <div className={'block sm:flex mt-5 md:mt-3 text-justify hyphens-auto'}>
                <div className={'basis-[49%] flex-none sm:pr-5'}>
                  <p>
                    Hey, I'm Stefan.
                  </p>
                  <p>
                    I'm a software developer that's passionate about doing what matters.
                    Throughout my career, my perspective on what truly matters in software
                    development has changed and evolved.
                  </p>
                  <p>
                    Early in my career, I focused on delivering business requirements quickly, without asking too many
                    questions. Later, I prioritised writing "clean code", and crafting SOLID masterpieces.
                    Today, my goal is to deliver "the right things" in "the right way", on time, while building
                    meaningful relationships with my peers.
                  </p>
                  <p>
                    I spend a significant part of my role being the glue between product-oriented folks and techies;
                    between teams that work in closely-related domains. I recognise that today's new code becomes
                    tomorrow's tech debt and I try to balance short delivery cycles with building evolutionary
                    architectures. I harp on dogfooding to bring user and developer experience to the fore.
                  </p>
                  <p>
                    I try to ask more questions than I answer – both to learn and to teach. I firmly believe in
                    collaboration and acknowledging the contributions of others. It brings me joy to give credit
                    where it's due and to foster people's growth within their respective roles.
                  </p>
                  <p>But I'm getting ahead of myself.</p>
                </div>
                <div className={'hidden sm:block basis-[2%] flex-none place-self-center py-5'}>
                  <div className={'w-0.5 sm:h-[40rem] md:h-[33rem] lg:h-[38rem] xl:h-[45rem]' +
                    ' bg-slate-200 rounded mx-auto'}/>
                </div>
                <div className={'basis-[49%] flex-none sm:pl-5'}>
                  <p>
                    How did I get into programming? Frankly, I'd have a hard time making this an exciting story, so I
                    won't try that.
                  </p>
                  <p>
                    I've met folks who'd earned PhDs in quantum physics, mathematics, or chemistry before making
                    successful transitions into programming. I can't help but feel a hint of envy towards those
                    extraordinary individuals.
                  </p>
                  <p>
                    My personal journey into the realm of software development is not that cool.
                    My own journey began during high school, where I
                    grappled with the challenges of C and C++ algorithm courses.
                  </p>
                  <p>
                    Early into my university years, thanks to my brother, I became captivated by web development.
                    Suddenly, there was more to programming than writing sorting algorithms in Notepad++
                    (although it took me longer to discover that there are
                    other editors out there). Taking a course in PHP and one in MySQL allowed me the opportunity to
                    gain an early foothold in the job market.
                  </p>
                  <p>
                    Since those early days, I've worked as a dev across 3 countries. I now work
                    cross-functionally with frameworks like React or NextJS, Spring Boot etc.
                    Now and again I stumble upon a YouTube video about jQuery or PHP and
                    I can't help but smile. It's a nostalgic reminder of where I started and how much I've learned.
                  </p>
                </div>
              </div>
              <h2>What do you do for fun?</h2>
              <div className={'block lg:flex lg:text-justify lg:hyphens-auto'}>
                <div className={'basis-[49%] flex-none lg:pr-5 overflow-hidden'}>
                  <div
                    className={
                      'max-w-full flex snap-x snap-mandatory gap-x-4 overflow-x-auto ' +
                      'bg-stripes-dark rounded p-3.5 shadow-inner'
                    }
                  >
                    {props.aboutIntroPhotos.map((photo, index) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'relative grid grid-cols-1 grid-rows-2 justify-items-center ' +
                            'h-[400px] w-[267px] sm:h-[360px] sm:w-[240px] ' +
                            'lg:h-[600px] lg:w-[400px] xl:h-[630px] xl:w-[420px] ' +
                            'shrink-0 snap-center overflow-hidden rounded drop-shadow'
                          )}
                        >
                          <Image
                            src={urlForImage(photo.image)
                              .height(INTRO_PHOTO_HEIGHT)
                              .width(INTRO_PHOTO_WIDTH)
                              .fit('crop')
                              .crop(photo.image.cropMode)
                              .dpr(pixelRatio)
                              .url()}
                            className={cn(
                              'z-0 col-start-1 row-span-2 row-start-1 rounded'
                            )}
                            quality={100}
                            placeholder={'blur'}
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(imgPlaceholder(INTRO_PHOTO_WIDTH, INTRO_PHOTO_HEIGHT))}`}
                            height={INTRO_PHOTO_HEIGHT}
                            width={INTRO_PHOTO_WIDTH}
                            sizes="33vw"
                            alt={photo.image.alt}
                            title={photo.image.alt}
                            priority={index < 4}
                            onClick={() => hideFigCaptionAtIndex(index)}
                          />
                          <div
                            className={cn(
                              'group z-20 mb-1 w-full lg:mb-2 ' +
                              'col-start-1 row-span-1 row-start-2 self-end ' +
                              'mix-blend-overlay hover:mix-blend-hard-light ' +
                              'cursor-pointer'
                            )}
                            onClick={() => showFigCaptionAtIndex(index)}
                          >
                            <IconHr
                              icon={faCircleInfo}
                              iconWidth={32}
                              iconHeight={32}
                              iconClassNames={
                                'text-2xl md:text-2xl text-slate-300 group-hover:text-slate-200 ' +
                                'transition-all duration-300 ease-out'
                              }
                              hrClassNames={
                                'w-6 md:w-8 bg-slate-300 group-hover:w-16 ' +
                                'group-hover:md:w-24 group-hover:bg-slate-200 ' +
                                'transition-all duration-300 ease-out'
                              }
                            />
                          </div>
                          <figcaption
                            data-photo-index={index}
                            className={cn(styles.portableText, {
                              'mb-0 h-full': showPhotoCaptionAtIndex === index,
                            })}
                          >
                            <div>
                              <SanePortableText content={photo.image.caption} />
                            </div>
                          </figcaption>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={'hidden lg:block basis-[2%] flex-none place-self-center py-5'}>
                  <div className={'w-0.5 lg:h-[40rem] xl:h-[36rem]' +
                    ' bg-slate-200 rounded mx-auto'}/>
                </div>
                <div className={'basis-[49%] flex-none lg:pl-5'}>
                  <div className={'justify-self-end'}>
                    <p className={'mt-5 lg:mt-0'}>
                      I'm glad you asked! As folks who enjoy our work, we often neglect taking enough
                      time off, relaxing, exercising and so on.
                    </p>
                    <p>
                      I like photography. As a hobby, I used to collect vintage lenses, play with
                      drones, build drone (singular). Then break drone on the first landing attempt…
                      Anyway, these days I rely a lot on the convenience of my phone to capture moments and edit photos.
                    </p>
                    <p>
                      I am an avid consumer of <Link
                        href={`${PAGE_POSTS_PATH}/my-favourite-subscriptions-as-a-software-dev`}
                        target='_blank'>YouTube</Link>.
                      When I'm not watching tech videos, I'm probably watching a
                      science channel or video games channel. Though I now primarily indulge in mobile RPGs, I still
                      enjoy chatting about all kinds of video games.
                    </p>
                    <p>
                      As far as reading goes, I nowadays consume most of my <Link
                        href={`${PAGE_POSTS_PATH}/my-favourite-books-as-a-software-dev`}
                        target='_blank'>books</Link> in audio format. My usual topics of
                      interest are science-fiction or fantasy books, as well as a lot of stuff about
                      soft skills development, human psychology and emotional intelligence,
                      books about ways of working and leadership skills etc.
                    </p>
                    <p>
                      When I'm not doing one of the things above and I'm not on vacation, I'm probably at the
                      gym, doing a bit of weightlifting. Yes, I like to nerd out about fitness topics that as well.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <SectionSeparator classNames={'mt-[2.5rem] mb-[2.5rem]'} />
            <section>
              <h1>Recent experience</h1>
              <p>Here's a few short notes about my recent professional experience. For the full picture,
              check out my CV.</p>
              <p>By the way, check out what I'm <Link href={`${PAGE_POSTS_PATH}?tag=yearly-learning`}
                target='_blank'>learning</Link> this year
                and what tech I'm <Link href={`${PAGE_POSTS_PATH}?tag=experiment&tag=showcase`}
                target='_blank'>experimenting</Link> with in the blog section of this website.
              </p>
              <div
                className={cn(
                  'grid grid-cols-12 ' +
                    'gap-x-0.5 md:gap-x-3.5 lg:gap-x-5',
                  {
                    hidden: showDeviceOrientationCTA,
                  }
                )}
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
                        icon={faArchive}
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
                    'h-[700px] gap-y-5 space-y-5 overflow-auto px-2 ' +
                    'snap-y snap-mandatory scroll-smooth ' +
                    'bg-stripes rounded shadow-inner'
                  }
                >
                  <div className={styles.topShadow} />
                  <div
                    data-company={'tg'}
                    className={`${styles.roleContainer} snap-center snap-always relative`}
                  >
                    <Link href={'https://tarabutgateway.com/'}
                      target='_blank' rel='nofollow'>
                      <h2 className={'uppercase font-extralight tracking-widest text-slate-800'}>Tarabut Gateway</h2>
                    </Link>
                    <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                    <p className={'text-xs text-slate-400 md:text-sm'}>
                      {/*TODO: add a helper fn to do this properly!!!*/}
                      Jan 2022 - Present • {Math.floor((differenceInMonths(
                        TODAY, new Date(2022, 0, 4)
                      ) + 1)/12)} yr {(differenceInMonths(
                        TODAY, new Date(2022, 0, 4)
                      ) + 1)%12} months • Technical Lead • Open Banking Payments Platform
                    </p>
                    <div className={'grow pb-4 sm:pb-24 lg:pb-28'}>
                      <p className={'mb-2'}>
                        Being MENA's first and largest regulated <LinkExternal
                          href={'https://tarabutgateway.com/' +
                            'decoding-the-abcs-open-banking-glossary/' +
                            '#services-&-technology'}>OB</LinkExternal> platform, Tarabut Gateway is <LinkExternal
                          href={'https://tarabutgateway.com/'}>redefining financial services in
                        the region</LinkExternal>.
                      </p>
                      <p>
                        As tech lead of the <LinkExternal
                          href={'https://tarabutgateway.com/decoding-the-abcs-open-banking-glossary/#pisp'}>PISP
                        </LinkExternal> team, I led the transformation of the payments platform and API,
                        unlocking a host of cool new features:
                      </p>
                      <ul>
                        <li>
                          Extensibility from Bahrain to the entire MENA region – an increase of over
                          3600% in market size
                          <div className={'group cursor-pointer inline'}>
                            <sup className={'text-xs md:text-sm xl:text-base'}>
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                className={'ml-0.5 w-2 md:w-3 xl:w-3.5'}
                              />
                            </sup>
                            <div className={'group-hover:block hidden ' +
                              'absolute top-5 left-0 right-0 mx-auto ' +
                              'w-[75%] p-5 rounded ' +
                              'bg-slate-100 shadow-md'}>
                              <p className={'mb-0 mt-0'}>
                                Based on GDP data from <LinkExternal
                                  href={'https://data.worldbank.org/'}>The World Bank</LinkExternal>,
                                adjusted for our product's near-future target countries
                                (the entire MENA region's GDP is over 9800% that of Bahrain's),
                                not adjusted for the TAM/SAM/SOM of those countries.
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          Better UX by supporting <LinkExternal href={'https://standards.openbanking.org.uk/' +
                          'customer-experience-guidelines/authentication-methods/' +
                          'redirection-app-based-redirection-pis/latest/'}>app-based
                          redirection</LinkExternal>, a multi-lingual UI and more – targeting improved conversion
                          rates and client adoption
                        </li>
                        <li>
                          Better DevX by removing <LinkExternal
                            href={'https://articles.uie.com/experience_rot/'}> experience rot</LinkExternal> to
                          reduce cognitive load for integrating with our API:
                          <ul>
                            <li>Condensed the payment initiation API from 20 request body parameters
                              (13 optional), down to just 7 required parameters</li>
                            <li>Simplified the overall PISP API footprint from 12 endpoints to just 2 endpoints</li>
                          </ul>
                        </li>
                      </ul>
                      <p className={'mb-2'}>
                        Technical wins:
                      </p>
                      <ul>
                        <li>
                          Our team reduced the maintenance and operational
                          overhead, by streamlining the platform's previous 10 services, 5 databases,
                          and 4 queues into just 2 services and 1 database
                        </li>
                        <li>
                          Additionally, we adapted our tech
                          stack to support a richer UI and UX, and to align with the company's hiring strategy
                        </li>
                      </ul>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div
                    data-company={'tw'}
                    className={`${styles.roleContainer} snap-center snap-always`}
                  >
                    <Link href={'https://www.thoughtworks.com/'}
                      target='_blank' rel='nofollow'>
                      <h2 className={'font-semibold tracking-tight-ma-only'}
                        style={{
                          color: '#013d4f!important',
                        }}
                      ><span className={'text-rose-400 font-black inline-block antialiased ' +
                        '-translate-x-[2px] -skew-y-[7deg] -skew-x-[10deg] rotate-[8deg] ' +
                        'text-[1.5rem] sm:text-[1.9rem] md:text-[2.25rem] xl:text-[2.5rem] ' +
                        '-translate-y-[4px] sm:-translate-y-[5px] md:-translate-y-[6px] xl:-translate-y-[6px]'}>/</span>
                        thoughtworks</h2>
                    </Link>
                    <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                    <p className={'text-xs text-slate-400 md:text-sm'}>
                      Apr 2021 - Dec 2021 • 9 mos • Technical Lead Consultant • <Link
                        href={'https://www.bp.com/'} target='_blank' rel='nofollow'>BP</Link> mobile
                    </p>
                    <div>
                      <p>
                        With a global presence in more than 60 countries, BP is <LinkExternal
                          href={'https://www.bp.com/en/global/corporate/who-we-are.html'}> reimagining energy for
                        people and our planet</LinkExternal>.
                      </p>
                      <p>
                        As tech lead of the mobile frameworks team, I supported BP in unifying their
                        design language and building loosely coupled yet cohesive mobile app components
                        for teams worldwide to easily integrate.
                        Our success measure was the increasing internal
                        adoption of the tools we developed.
                      </p>
                      <p>
                        We contributed our experience
                        as a blip on the <LinkExternal href={'https://www.thoughtworks.com/en-gb/' +
                        'radar/techniques/micro-frontends-for-mobile'}>Thoughtworks Technology Radar</LinkExternal> and
                        leveraged DORA's <LinkExternal
                          href={'https://cloud.google.com/blog/products/devops-sre/' +
                          'using-the-four-keys-to-measure-your-devops-performance'}>4 key
                        metrics</LinkExternal> to systematically evaluate and enhance our team's performance,
                        fostering continuous improvement.
                      </p>
                    </div>
                    <SectionSeparator classNames={'mb-[0rem] mt-[0.25rem] md:mt-[1rem]'} />
                    <p className={'text-xs text-slate-400 md:text-sm'}>
                      Sep 2018 - Apr 2021 • 2 yrs 7 mos • Senior Consultant • Various Projects
                    </p>
                    <div className={'grow pb-3 sm:pb-6 lg:pb-7'}>
                      <p>
                        As a senior consultant, I actively supported:
                      </p>
                      <ul>
                        <li>
                          The digital transformation of a prominent UK gov department, later assuming
                          a tech lead role. We replaced spreadsheets with dynamic and accessible dashboards,
                          revolutionizing data sharing and presentation methods to boost operational efficiency.
                        </li>
                        <li>
                          The platform upgrade of a rapidly growing Insurtech in London.
                          Partnering with the client's tech lead to use <LinkExternal
                            href={'https://martinfowler.com/' +
                              'bliki/DomainDrivenDesign.html'}>domain-driven design</LinkExternal> principles and
                          a strategic <LinkExternal
                            href={'https://martinfowler.com/bliki/' +
                              'StranglerFigApplication.html'}>strangler fig</LinkExternal> approach, we
                          transitioned their platform to a service and <LinkExternal
                            href={'https://martinfowler.com/articles/micro-frontends.html'}>micro
                          frontends</LinkExternal> based architecture.
                        </li>
                      </ul>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div
                    data-company={'wf'}
                    className={`${styles.roleContainer} snap-center snap-always`}
                  >
                    <div>
                      <Link href={'https://www.worldfirst.com/uk/'}
                        target='_blank' rel='nofollow'>
                        <h2 className={'uppercase tracking-wider text-rose-500'}>WorldFirst</h2>
                      </Link>
                      <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                      <p className={'text-xs text-slate-400 md:text-sm'}>
                        Dec 2017 - Aug 2018 • 9 mos • Senior Developer • Forex Platform API
                      </p>
                    </div>
                    <div className={'grow pb-12 sm:pb-24 lg:pb-28'}>
                      <p>
                        Having an international presence, with offices in 9 countries across 3 continents, WorldFirst
                        is a global fintech that <LinkExternal href={'https://www.worldfirst.com/uk/about-us/'}>is
                        making it easy to do business anywhere</LinkExternal>.
                      </p>
                      <p>
                        As a senior developer, I supported WorldFirst in their strategic initiative to transition
                        from a monolithic legacy platform to a service-oriented architecture.
                        We implemented the <LinkExternal
                          href={'https://martinfowler.com/bliki/' +
                            'StranglerFigApplication.html'}>strangler fig</LinkExternal> pattern,
                        streamlining value delivery and optimizing the engineering department's structure through the
                        alignment of critical business areas with small teams.
                      </p>
                      <p>
                        Because I had a keen interest in <LinkExternal
                          href={'https://martinfowler.com/bliki/DomainDrivenDesign.html'}>domain-driven
                        design</LinkExternal>, I took the initiative to create a <LinkExternal
                          href={'https://martinfowler.com/bliki/BoundedContext.html'}>context map</LinkExternal> of
                        the existing system. Collaborating with the systems architect for
                        the Forex platform API, I contributed to shaping the engineering vision for the next platform
                        version. Additionally, I facilitated meetings involving teams responsible for various services
                        derived from the legacy platform in order to get everyone aligned.
                        To promote domain-driven design, I presented on the topic during our brown bag sessions,
                        championing its principles.
                      </p>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div
                    data-company={'older'}
                    className={`${styles.roleContainer} snap-center snap-always`}
                  >
                    <div>
                      <h2>Previous experience</h2>
                      <SectionSeparator classNames={'mb-[0rem] mt-[0rem]'} />
                      <p className={'text-xs text-slate-400 md:text-sm'}>
                        ~ 2010 - Dec 2017
                      </p>
                    </div>
                    <div className={'grow pb-12 sm:pb-24 lg:pb-28'}>
                      <p>
                        My journey into web development began with my self-driven projects, building websites
                        using good ol' PHP (and even a bit of Flash with Adobe Dreamweaver – the nostalgia!).
                        One website featured a comprehensive catalog of cat and dog breeds, while the other allowed
                        users to send customized virtual postcards by uploading a photo and embedding their message
                        in the image.
                      </p>
                      <p>From 2012 to 2016, I honed my skills as a web developer in Bucharest, Romania. Working at
                        small companies offered a unique opportunity to gain hands-on experience across the entire
                        technology stack, including frontend, backend, and databases. It was an exciting period of
                        discovery (MySQL was more popular at that point, wasn't it?).</p>
                      <p>
                        In early 2016, I embarked on a new chapter by joining my first large, international company, in
                        Luxembourg: <LinkExternal href={'https://www.doclerholding.com/'}>Docler
                        Holding</LinkExternal>. In this role, for the first time, I focused primarily on backend
                        development, working with dedicated frontend specialists database teams.
                      </p>
                      <p>
                        Seeking further growth, I relocated to London at the end of 2017 to join the team at
                        WorldFirst.
                      </p>
                    </div>
                    <hr className={styles.gripLine} />
                  </div>
                  <div className={styles.bottomShadow} />
                </div>
              </div>
              {showDeviceOrientationCTA && (
                <div
                  className={
                    'grid h-64 grid-cols-1 place-items-center rounded bg-slate-200'
                  }
                >
                  <div className={'relative h-10 w-10'}>
                    <div
                      className={
                        'absolute bottom-3 left-0 animate-reveal-bottom-up overflow-hidden'
                      }
                    >
                      <FontAwesomeIcon
                        icon={faArrowTurnUp}
                        width={15}
                        height={15}
                        flip={'horizontal'}
                      />
                    </div>
                    <div className={'absolute bottom-0 right-0'}>
                      <FontAwesomeIcon
                        icon={faMobileScreen}
                        width={25}
                        height={25}
                        className={'animate-spin-quarter text-5xl'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
            <SectionSeparator />
            <section>
              <h1>Epilogue</h1>
              <p>
                Thank you for reading so far.
              </p>
              <p>
                If you found anything interesting, you learned something or found a typo,
                go ahead and tell me about it on <LinkExternal href={'https://www.linkedin.com/in/stefanpetcu/'}>
                LinkedIn</LinkExternal>! Don't forget to check out my <LinkExternal
                  href={'https://docs.google.com/' +
                  'document/d/1NqyHwuq5-EtZwCHN07z4qPlTOclAtuisyLk6xKdCfhI/' +
                  'edit?usp=sharing'}>CV</LinkExternal> to read more about my experience.
              </p>
            </section>
          </article>
          <BlogFooter admin={settings.admin} activeLink={'about'} />
        </Container>
      </Layout>
    </>
  );
}
