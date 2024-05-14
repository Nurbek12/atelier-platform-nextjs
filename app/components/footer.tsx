import { useTranslations } from "next-intl"

export function Footer() {
    const t = useTranslations('nav')
    return (
        <footer className="bg-background" aria-labelledby="footer-heading">
            {/* <h2 id="footer-heading" className="sr-only">Footer</h2> */}
            <div className="mx-auto container py-8 sm:pt-10 lg:pt-16">
                {/* <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <p className="text-sm leading-6">Making football look better to the world and a more respecful game.</p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span>Facebook</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-4      00">
                                <span>X Twitter</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span>GitHub</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span>YouTube</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6">Solutions</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="#" className="text-sm leading-6">Marketing</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Analytics</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Commerce</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Insights</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6">Support</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="#" className="text-sm leading-6">Pricing</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Documentation</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Guides</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">API Status</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6">Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="#" className="text-sm leading-6">About</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Blog</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Jobs</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Press</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Partners</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a href="#" className="text-sm leading-6">Claim</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Privacy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm leading-6">Terms</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="mt-4 border-t border-gray-900/10 pt-8">
                    <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} Couture Corner, Inc. {t('footer')}.</p>
                </div>
            </div>
        </footer>
    )
}