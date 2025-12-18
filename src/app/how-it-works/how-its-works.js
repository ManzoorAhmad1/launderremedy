   <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
    

      {/* How It Works Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Steps Navigation - Clean buttons */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex flex-wrap justify-center gap-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToStep(index)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${activeStep === index
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                  >
                    Step {step.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Steps Content - Good alternating layout */}
            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                    }`}
                >
                  {/* Left Column - Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 mb-4">
                      <span className="font-bold mr-2">Step {step.number}</span>
                      <span className="font-medium">{step.subtitle}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
                      {step.title}
                    </h2>

                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                      {step.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                          <span className="text-neutral-700 dark:text-neutral-300">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {step.note && (
                      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
                        <p className="text-primary-700 dark:text-primary-300 italic">{step.note}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Visual with Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative">
                      {/* Main Image Container */}
                      <div className={`relative rounded-2xl overflow-hidden shadow-xl border border-white/20 ${step.color} p-1`}>
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20`} />

                        {/* Step Number Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-xl">{step.number}</span>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
                          <Image
                            src={step.image}
                            alt={step.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === 0}
                          />

                          {/* Overlay Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-20`} />

                          {/* Icon Overlay */}
                          <div className="absolute bottom-4 right-4">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                              <step.icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Step Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4">
                          <h3 className="text-xl font-bold text-white">
                            Step {step.number}: {step.title}
                          </h3>
                          <p className="text-white/90 text-sm">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 dark:bg-neutral-800/10 backdrop-blur-sm rounded-xl rotate-12 animate-float hidden md:block" />
                      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 dark:bg-neutral-800/10 backdrop-blur-sm rounded-xl -rotate-12 animate-float animation-delay-1000 hidden md:block" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white mb-4">
              <Star className="w-4 h-4 mr-2 fill-white" />
              Rated excellent ★★★★ by 5,000+ users
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Our Happy Customers</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Don't just take our word for it - hear what our customers have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${testimonial.color} rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center font-bold text-lg mr-4 border border-neutral-200 dark:border-neutral-700">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{testimonial.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section - FULL WIDTH */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="p-4 rounded-2xl bg-white/10 mb-6">
                <Smartphone className="w-12 h-12" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Download our mobile app
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl">
                Available on the App Store and Google Play. Manage orders, track deliveries, and get exclusive offers.
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {appStores.map((store) => (
                <motion.button
                  key={store.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${store.color} px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors group border border-white/20 dark:border-white/10`}
                >
                  <div className={`text-2xl ${store.iconColor}`}>{store.icon}</div>
                  <div className="text-left">
                    <div className="text-xs">{store.description}</div>
                    <div className="text-lg">{store.action}</div>
                  </div>
                  <Download className={`w-5 h-5 ${store.iconColor} group-hover:translate-y-1 transition-transform`} />
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <p className="text-sm opacity-90">
                Follow us on social media for cleaning tips and exclusive promotions
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              BOOK TODAY, WEAR HAPPINESS EVERYDAY.
            </h2>

            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Experience the convenience of professional laundry service delivered to your doorstep.
            </p>

            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all group"
              asChild
              onClick={() => router.push('/place-order')}

            >
              <p>
                Schedule your pickup
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </p>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-xl">LR</span>
                </div>
                <span className="text-xl font-bold text-white">LaunderRemedy</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Revolutionizing laundry services with speed, quality, and convenience.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/how-it-works" className="text-neutral-400 hover:text-primary-400 transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="text-neutral-400 hover:text-primary-400 transition-colors">Pricing</Link></li>
                <li><Link href="/about-us" className="text-neutral-400 hover:text-primary-400 transition-colors">About Us</Link></li>
                <li><Link href="/faq" className="text-neutral-400 hover:text-primary-400 transition-colors">FAQ</Link></li>
                <li><Link href="/contact-us" className="text-neutral-400 hover:text-primary-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-neutral-400">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+44 7442 716396</span>
                </li>
                <li className="flex items-center text-neutral-400">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>launderremedy@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-neutral-500 text-sm mb-4 md:mb-0">
                All rights reserved. © LaunderRemedy {new Date().getFullYear()}.
              </p>

              <div className="flex items-center space-x-6">
                <Link href="/privacy" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>

            <p className="text-center text-neutral-600 text-sm mt-4">
              By visiting this page you agree to our privacy policy and terms and conditions.
            </p>
          </div>
        </div>
      </footer>
    </div>