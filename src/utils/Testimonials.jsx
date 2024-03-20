export default function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-24">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img className="mx-auto h-60" src="../data/logo.png" alt="" />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Our site is a place where everyone can feel like a chef, where
              small ingredients become the key to the most delicious dishes, and
              every dish you cook becomes a journey into the world of taste.
              Join us on this culinary journey, where everyone discovers new
              culinary horizons every day and enjoys every kitchen experiment.
              Are you ready to discover new flavors and inspiration? Let&apos;s
              start together! 🍽️✨”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-indigo-600">Savannah Red</div>
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-gray-600">Co-Owner</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
