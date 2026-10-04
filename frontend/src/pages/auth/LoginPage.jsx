import { Check, ShieldCheck } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-background font-body-md text-on-surface flex flex-col mt-12">
            {/* Main */}
            <main className="flex-1 w-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 flex items-center justify-center">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden shadow-xl bg-surface">

                        {/* Left Editorial Panel */}
                        <div className="relative lg:col-span-5 hidden lg:flex flex-col justify-between p-8 xl:p-10 overflow-hidden bg-primary text-white">

                            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-container to-secondary opacity-90" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                                    <Check size={16}/>
                                    <span className="text-[11px] uppercase tracking-wider">
                                        Shop with confidence
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full">
                                    <ShieldCheck size={16} />
                                    <span className="text-[11px] uppercase tracking-wider">
                                        Certified B Corp
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 my-auto py-12">
                                <span className="text-6xl text-accent-light/40 font-serif leading-none block">
                                    “
                                </span>

                                <blockquote className="font-title text-[2.5rem] xl:text-4xl font-semibold leading-tight tracking-tight -mt-3 mb-5">
                                    Everything you need, all in one place.
                                </blockquote>

                                <div className="flex items-center gap-2 pt-2">
                                    <div className="w-8 h-0.5 bg-accent-light/60" />
                                    <span className="text-sm text-white/70 tracking-wide">
                                        Studio Edition • Vol. IX
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-8 bg-white/10 backdrop-blur-md p-4 rounded-lg">
                                    <div>
                                        <div className="text-3xl font-bold">1000+</div>
                                        <div className="text-xs text-white/70">
                                            Products Available
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-3xl font-bold">24/7</div>
                                        <div className="text-xs text-white/70">
                                            Customer Support
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className="lg:col-span-7 p-6 md:p-10 flex flex-col bg-surface">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;