const posts = [
  {
    id: 1,
    title: "Pleasantly surprised!",

    description:
      "This site is a real find! I was always waiting for a free minute to plunge into the world of culinary wonders. Incredibly useful tips and lots of recipes that just saved our family dinners!",
    date: "Mar 16, 2024",
    datetime: "2024-03-16",
    category: { title: "Marketing" },
    author: {
      name: "Michael Foster",
      role: " Teacher",

      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "It's really delicious!",
    href: "#",
    description:
      "I always thought that cooking was for chefs. But this site changed my mind. Simple, clear recipes and tips allow everyone to find their way to their own culinary art.",
    date: "Mar 5, 2024",
    datetime: "2024-03-5",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Mike Ford",
      role: "Doctor",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 3,
    title: "Exquisite flavor!",
    href: "#",
    description:
      "This site is a real treasure trove for gourmets. As a lover of fine cuisine, I am always looking for something new and unique, and here I find everything I need. It has become my best assistant in culinary experiments!",
    date: "Mar 10, 2024",
    datetime: "2024-03-10",
    author: {
      name: "Judith Black",
      role: "Designer",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function BlogSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
            About us
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Cooking - it&apos;s easy. You just need to try it!
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
