import { nextTick, type Ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations(
  scope: Ref<HTMLElement | null>,
  hasSecondProject: Ref<boolean>
) {
  let ctx: gsap.Context | null = null;

  const initHomeAnimations = async () => {
    await nextTick();

    if (!scope.value) return;

    ctx?.revert();

    ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=260%",
          scrub: 1.5,
          pin: true,
        },
      });

      heroTl.to(".home-title", {
        opacity: 0,
        y: -50,
        duration: 1,
      });

      heroTl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        ">0.25"
      );

      heroTl.to(
        ".hero-subtitle",
        {
          opacity: 0,
          y: -50,
          duration: 1,
        },
        "+=0.8"
      );

      gsap.fromTo(
        ".project-one-section",
        { scaleX: 0.5, scaleY: 0.8 },
        {
          scaleX: 1,
          scaleY: 1,
          scrollTrigger: {
            trigger: ".projects-stage",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".project-one-section .vinyl",
        { rotation: 0 },
        {
          rotation: 600,
          scrollTrigger: {
            trigger: ".projects-stage",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".project-one-section .vinyl",
        { rotation: 600 },
        {
          rotation: 1680,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".projects-stage",
            start: "top top",
            end: "top -260%",
            scrub: 1.5,
          },
        }
      );

      if (hasSecondProject.value) {
        gsap.set(".project-two-section", {
          xPercent: -100,
          scaleX: 1,
          scaleY: 1,
        });

        gsap.to(".project-two-section", {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-stage",
            start: "top -60%",
            end: "top -260%",
            scrub: 1.5,
          },
        });

        gsap.fromTo(
          ".project-two-section .vinyl",
          { rotation: 0 },
          {
            rotation: 720,
            scrollTrigger: {
              trigger: ".projects-stage",
              start: "top -60%",
              end: "top -260%",
              scrub: 1.5,
            },
          }
        );
      }
    }, scope.value);

    ScrollTrigger.refresh();
  };

  const destroyHomeAnimations = () => {
    ctx?.revert();
    ctx = null;
  };

  return {
    initHomeAnimations,
    destroyHomeAnimations,
  };
}