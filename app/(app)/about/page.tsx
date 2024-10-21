import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="w-full overflow-x-hidden">
            {/* Hero Section */}
            <div className="bg-cover bg-center w-full h-64 flex items-center justify-center" style={{ backgroundImage: "url('/your-banner-image.jpg')" }}>
                <h1 className="text-5xl font-bold text-white px-6 py-3 rounded-lg" style={{ backgroundColor: '#c6a75e' }}>Welcome to Diplomat</h1>
            </div>

            {/* Main Content Section */}
            <div className="w-full px-4 lg:px-16 mt-16">
                {/* About Us Section */}
                <section className="text-slate-800 mb-16">
                    <h2 className="text-3xl font-semibold py-3 px-3 rounded-lg border-docorange-200 border-2 inline-block">About Us</h2>
                    <p className="text-xl mt-4"><strong>Welcome to your new partner for Model UN.</strong></p>
                    <p>Diplomat is the brand new program to streamline the process of creating, joining, and viewing Model United Nations Tournaments.</p>
                </section>

                {/* Features Section */}
                <section className="lg:flex lg:justify-between text-slate-800 mb-16">
                    <div className="space-y-4 lg:w-2/5">
                        <h3 className="text-xl font-semibold">Diplomat can assist with</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            {/* Creating Card */}
                            <div className="h-48 lg:aspect-square px-4 py-4 rounded-lg bg-slate-300 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                                <div>
                                    <i className="py-6 fa-regular fa-pen-to-square fa-xl"></i>
                                </div>
                                <p className="text-md lg:text-lg font-semibold">Creating</p>
                                <p>tournament pages for school-level Model UN competitions</p>
                            </div>
                            {/* Viewing Card */}
                            <div className="h-48 lg:aspect-square px-4 py-4 rounded-lg bg-slate-200 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                                <div>
                                    <i className="py-6 fa-regular fa-eye fa-xl"></i>
                                </div>
                                <p className="text-md lg:text-lg font-semibold">Viewing</p>
                                <p>tournaments in your area, delegates signed up, and results</p>
                            </div>
                            {/* Monitoring Card */}
                            <div className="h-48 lg:aspect-square px-4 py-4 rounded-lg bg-slate-100 text-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                                <div>
                                    <i className="py-6 fa-regular fa-user fa-xl"></i>
                                </div>
                                <p className="text-md lg:text-lg font-semibold">Monitoring</p>
                                <p>delegates, their results, and tournament procedures</p>
                            </div>
                        </div>
                        {/* CTA Button */}
                        <Link href="/admin/create-tournament">
                            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transform transition-all duration-200">
                                Sign Up For A Tournament Today
                            </button>
                        </Link>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-3/3 flex justify-center mt-10 lg:mt-0">
                        <Image src="/un_logo.png" alt="UN logo" width={500} height={500} className="h-auto lg:block" />
                    </div>
                </section>

                {/* Mission Section */}
                <section className="mt-16 bg-gray-100 py-10">
                    <h3 className="text-center text-2xl font-semibold">Our Mission</h3>
                    <p className="text-center mt-4 mx-auto w-3/4 lg:w-1/2">Empowering students to connect, learn, and excel in Model United Nations tournaments worldwide.</p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
