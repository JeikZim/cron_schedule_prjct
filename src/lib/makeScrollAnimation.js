const scrollAnimation = (direction, scrollDuration, elements) => {
    return (ev) => {
        let scrollStart = null;

        const scrollStep = (timestamp) => {
            if (!scrollStart) scrollStart = timestamp;
            const progress = timestamp - scrollStart;

            elements.forEach((el) => {
                let scrollDistance = el.scrollWidth - el.offsetWidth;
                let scrollAmount = el.scrollLeft;

                if (direction === "left" && scrollAmount > 0) {
                    scrollAmount = Math.max(
                        scrollAmount - (progress / scrollDuration) * scrollDistance,
                        0
                    );
                } else if (
                    direction === "right" &&
                    scrollAmount < scrollDistance
                ) {
                    scrollAmount = Math.min(
                        scrollAmount + (progress / scrollDuration) * scrollDistance,
                        scrollDistance
                    );
                }

                el.scrollLeft = scrollAmount;
            });

            if (progress < scrollDuration) {
                window.requestAnimationFrame(scrollStep);
            }
        };

        window.requestAnimationFrame(scrollStep);
    };
};

export default scrollAnimation;
