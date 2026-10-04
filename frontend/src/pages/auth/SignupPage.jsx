import SignUpForm from '../../components/auth/SignUpForm'

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background mt-12">

      {/* Header */}
      <header>
        {/* Stitch ka header */}
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Brand Section */}
            <div className="lg:col-span-5">
              {/* Stitch ka left section */}
            </div>

            {/* Right Form Section */}
            <div className="lg:col-span-7 bg-surface rounded-xl p-6 lg:p-8">
              
              <SignUpForm />

            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer>
        {/* Stitch ka footer */}
      </footer>

    </div>
  );
};

export default SignUpPage;