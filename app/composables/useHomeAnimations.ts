import { nextTick, type Ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations(
  scope: Ref<HTMLElement | null>,
  hasSecondProject: Ref<boolean>,
  hasThirdProject: Ref<boolean>,
  hasFourthProject: Ref<boolean>
) {
  let ctx: gsap.Context | null = null;

  const clamp01 = gsap.utils.clamp(0, 1);

  const progressBetween = (value: number, start: number, end: number) => {
    if (end === start) return value >= end ? 1 : 0;
    return clamp01((value - start) / (end - start));
  };

  const mix = (from: number, to: number, progress: number) => {
    return gsap.utils.interpolate(from, to, progress);
  };

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

      gsap.set(".project-one-section", {
        scaleX: 0.5,
        scaleY: 0.8,
      });

      if (hasSecondProject.value) {
        gsap.set(".project-two-section", {
          xPercent: -100,
          scaleX: 1,
          scaleY: 1,
        });
      }

      if (hasThirdProject.value) {
        gsap.set(".project-three-section", {
          xPercent: 100,
          scaleX: 1,
          scaleY: 1,
        });
      }

      if (hasFourthProject.value) {
        gsap.set(".project-four-section", {
          yPercent: 100,
          scaleX: 1,
          scaleY: 1,
        });
      }

      gsap.set(".project-one-section .vinyl-disc", { rotation: 0 });

      if (hasSecondProject.value) {
        gsap.set(".project-two-section .vinyl-disc", { rotation: 0 });
      }

      if (hasThirdProject.value) {
        gsap.set(".project-three-section .vinyl-disc", { rotation: 0 });
      }

      if (hasFourthProject.value) {
        gsap.set(".project-four-section .vinyl-disc", { rotation: 0 });
      }

      const totalUnits = hasFourthProject.value
        ? 1500
        : hasThirdProject.value
        ? 1140
        : hasSecondProject.value
        ? 740
        : 360;

      const stageEnd = hasFourthProject.value
        ? "top -1400%"
        : hasThirdProject.value
        ? "top -1040%"
        : hasSecondProject.value
        ? "top -640%"
        : "top -260%";

      ScrollTrigger.create({
        trigger: ".projects-stage",
        start: "top bottom",
        end: stageEnd,
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const u = self.progress * totalUnits;

          const projectOneScaleProgress = progressBetween(u, 0, 100);

          gsap.set(".project-one-section", {
            scaleX: mix(0.5, 1, projectOneScaleProgress),
            scaleY: mix(0.8, 1, projectOneScaleProgress),
          });

          let projectOneRotation = 0;

          if (u <= 100) {
            projectOneRotation = mix(0, 360, progressBetween(u, 0, 100));
          } else if (u <= 300) {
            projectOneRotation = mix(360, 1080, progressBetween(u, 100, 300));
          } else if (u <= 500) {
            projectOneRotation = mix(1080, 1440, progressBetween(u, 300, 500));
          } else {
            projectOneRotation = 1440;
          }

          gsap.set(".project-one-section .vinyl-disc", {
            rotation: projectOneRotation,
          });

          if (hasSecondProject.value) {
            const projectTwoX = mix(-100, 0, progressBetween(u, 300, 500));

            gsap.set(".project-two-section", {
              xPercent: projectTwoX,
              scaleX: 1,
              scaleY: 1,
            });

            let projectTwoRotation = 0;

            if (u <= 300) {
              projectTwoRotation = 0;
            } else if (u <= 500) {
              projectTwoRotation = mix(0, 360, progressBetween(u, 300, 500));
            } else if (u <= 700) {
              projectTwoRotation = mix(
                360,
                1080,
                progressBetween(u, 500, 700)
              );
            } else if (u <= 900) {
              projectTwoRotation = mix(
                1080,
                1440,
                progressBetween(u, 700, 900)
              );
            } else {
              projectTwoRotation = 1440;
            }

            gsap.set(".project-two-section .vinyl-disc", {
              rotation: projectTwoRotation,
            });
          }

          if (hasThirdProject.value) {
            const projectThreeX = mix(100, 0, progressBetween(u, 700, 900));

            gsap.set(".project-three-section", {
              xPercent: projectThreeX,
              scaleX: 1,
              scaleY: 1,
            });

            let projectThreeRotation = 0;

            if (u <= 700) {
              projectThreeRotation = 0;
            } else if (u <= 900) {
              projectThreeRotation = mix(
                0,
                360,
                progressBetween(u, 700, 900)
              );
            } else if (u <= 1100) {
              projectThreeRotation = mix(
                360,
                1080,
                progressBetween(u, 900, 1100)
              );
            } else if (u <= 1300) {
              projectThreeRotation = mix(
                1080,
                1440,
                progressBetween(u, 1100, 1300)
              );
            } else {
              projectThreeRotation = hasFourthProject.value ? 1440 : 1080;
            }

            gsap.set(".project-three-section .vinyl-disc", {
              rotation: projectThreeRotation,
            });
          }

          if (hasFourthProject.value) {
            const projectFourY = mix(100, 0, progressBetween(u, 1100, 1300));

            gsap.set(".project-four-section", {
              yPercent: projectFourY,
              scaleX: 1,
              scaleY: 1,
            });

            let projectFourRotation = 0;

            if (u <= 1100) {
              projectFourRotation = 0;
            } else if (u <= 1300) {
              projectFourRotation = mix(
                0,
                360,
                progressBetween(u, 1100, 1300)
              );
            } else if (u <= 1500) {
              projectFourRotation = mix(
                360,
                1080,
                progressBetween(u, 1300, 1500)
              );
            } else {
              projectFourRotation = 1080;
            }

            gsap.set(".project-four-section .vinyl-disc", {
              rotation: projectFourRotation,
            });
          }
        },
      });
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