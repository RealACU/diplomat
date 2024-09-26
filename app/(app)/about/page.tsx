import Image from "next/image";

const AboutPage = () => {
    return (
        <div className="text-slate-800">
            <p className="w-max text-3xl lg:ml-16 mx-8 lg:mx-0 mt-16 font-semibold py-3 px-3 rounded-lg border-docorange-200 border-2">About Us</p>
            <div className="grid lg:grid-cols-2 w-full">
                <div className="lg:ml-16 mx-8 lg:mx-0 mt-10 space-y-1">
                    <p className="text-xl pb-4"><strong>Welcome to your new partner for Model UN.</strong></p>

                    <p>Diplomat is the brand new program to streamline the process of creating, joining, and viewing Model United Nations Tournaments.
                    </p>

                    <p className="pt-16 text-xl pb-4"><strong>Diplomat can assist with</strong></p>
                    <div className="grid grid-cols-3">
                        <div className="xs:h-[250px] lg:aspect-square mr-4 px-4 py-4 rounded-lg bg-slate-300 text-center">
                            <div>
                                <i className="py-6 fa-regular fa-pen-to-square fa-xl"></i>
                            </div>
                            <p className="text-md lg:text-lg"><strong>Creating</strong></p> <p>tournament pages for school-level Model UN competitions</p>
                        </div>
                        <div className="xs:h-[250px] lg:aspect-square mr-4 px-4 py-4 rounded-lg bg-slate-200 text-center">
                            <div>
                                <i className="py-6 fa-regular fa-eye fa-xl"></i>
                            </div>
                            <p className="text-md lg:text-lg"><strong>Viewing</strong></p> <p>tournaments in your area, delegates signed up, and results</p>
                        </div>
                        <div className="xs:h-[250px] lg:aspect-square mr-4 px-4 py-4 rounded-lg bg-slate-100 text-center">
                            <div>
                                <i className="py-6 fa-regular fa-user fa-xl"></i>
                            </div>
                            <p className="text-md lg:text-lg"><strong>Monitoring</strong></p> <p>delegates, their results, and tournament procedures</p>
                        </div>
                    </div>
                </div>
                <div className="relative justify-center flex">
                    <Image src="/un_logo.png" alt="search-icon" width={500} height="0" className="h-auto hidden lg:flex"></Image>
                </div>
            </div>
        </div>
    )
};

export default AboutPage;
