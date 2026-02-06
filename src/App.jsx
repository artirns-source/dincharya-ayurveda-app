import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check, ChevronRight, Play, Pause, Heart, Sunrise, Droplet, Wind, Flower2, Book, Music, Activity, Coffee, PenTool, Info } from 'lucide-react';

const DincharyaApp = () => {
  const [screen, setScreen] = useState('onboarding');
  const [userName, setUserName] = useState('');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [dosha, setDosha] = useState('');
  const [completedTasks, setCompletedTasks] = useState({});
  const [moodSelected, setMoodSelected] = useState('');
  const [beadCount, setBeadCount] = useState(0);
  const [isChanting, setIsChanting] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const goals = [
    { id: 'stress', text: 'Reduce stress', icon: '🧘' },
    { id: 'routine', text: 'Build routine', icon: '📅' },
    { id: 'digestion', text: 'Improve digestion', icon: '🌿' },
    { id: 'energy', text: 'Increase energy', icon: '⚡' },
    { id: 'spiritual', text: 'Spiritual growth', icon: '🙏' }
  ];

  const doshaQuestions = [
    { q: 'Your body frame is:', a: ['Thin, light', 'Medium, muscular', 'Heavy, solid'] },
    { q: 'Your skin tends to be:', a: ['Dry, cool', 'Warm, oily', 'Thick, moist'] },
    { q: 'Your energy level is:', a: ['Variable, comes in bursts', 'Intense, consistent', 'Steady, enduring'] }
  ];

  const [doshaAnswers, setDoshaAnswers] = useState([]);

  const rituals = [
    { id: 'wake', title: 'Wake Up & Fresh Air', icon: Sunrise, desc: 'Rise with the sun, morning prayer, step outside', time: 'Morning' },
    { id: 'cleanse', title: 'Cleansing Rituals', icon: Droplet, desc: 'Warm water • Evacuate • Brush teeth • Tongue scraping • Abhyanga • Bath', time: 'Morning' },
    { id: 'meditation', title: 'Meditation & Breathwork', icon: Wind, desc: 'Connect with mantra chanting', time: 'Morning', hasSpecialScreen: true },
    { id: 'movement', title: 'Movement', icon: Activity, desc: 'Dosha-specific yoga practice', time: 'Morning', hasSpecialScreen: true },
    { id: 'eating', title: 'Mindful Eating', icon: Coffee, desc: 'Eat without screens, with gratitude', time: 'Midday' },
    { id: 'gita', title: 'Daily Gita Reading', icon: Book, desc: 'One verse with Prabhupada\'s purport', time: 'Afternoon', hasSpecialScreen: true },
    { id: 'listening', title: 'Daily Listening', icon: Music, desc: 'Radhanath Swami wisdom', time: 'Evening', hasSpecialScreen: true },
    { id: 'journal', title: 'Night Journal', icon: PenTool, desc: 'Reflect on your day', time: 'Evening', hasSpecialScreen: true }
  ];

  const gitaVerses = [
    {
      chapter: 2,
      verse: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      purport: "Srila Prabhupada explains: One has to learn his duty from authorized sources and act accordingly. This verse teaches the art of working without attachment to results, which is the secret of karma-yoga."
    },
    {
      chapter: 6,
      verse: 35,
      sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्। अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥",
      translation: "O mighty-armed son of Kuntī, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.",
      purport: "Srila Prabhupada explains: The mind is naturally restless, but through constant practice of devotional service and detachment from material desires, it can be controlled and fixed on the Supreme."
    },
    {
      chapter: 9,
      verse: 22,
      sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
      translation: "But those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have.",
      purport: "Srila Prabhupada explains: The Lord promises to take full care of His devotees who are fully surrendered to Him. This is the perfection of yoga - complete dependence on Krishna."
    }
  ];

  const [currentVerseIndex] = useState(Math.floor(Math.random() * gitaVerses.length));
  const gitaVerse = gitaVerses[currentVerseIndex];

  const radhanathVideos = [
    { id: "dIU-8jPUspY", title: "The Power of Gratitude in Spiritual Life" },
    { id: "w8KdC-9WzJk", title: "Finding Inner Peace Through Devotion" },
    { id: "jO47JYkk8gY", title: "The Art of Compassion and Love" },
    { id: "Xr5tUeDweY0", title: "Overcoming Material Desires" },
    { id: "vT6Pe5YG4YE", title: "Bhakti Yoga - Path of Devotion" },
    { id: "N9bfNU5LSOI", title: "Humility: Foundation of Spiritual Life" },
    { id: "kE2h48oVhBo", title: "Service: The Essence of Love" }
  ];

  const getDailyVideoIndex = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    return dayOfYear % radhanathVideos.length;
  };

  const currentVideo = radhanathVideos[getDailyVideoIndex()];

  useEffect(() => {
    const completed = Object.values(completedTasks).filter(Boolean).length;
    const prevCompleted = completedCount;
    
    setCompletedCount(completed);
    
    if (completed > prevCompleted && completed > 0) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 880;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    }
  }, [completedTasks, completedCount]);

  useEffect(() => {
    if (isChanting && beadCount < 108) {
      const interval = setInterval(() => {
        setBeadCount(prev => Math.min(prev + 1, 108));
      }, 5000);
      return () => clearInterval(interval);
    } else if (beadCount >= 108) {
      setIsChanting(false);
    }
  }, [isChanting, beadCount]);

  const toggleGoal = (goalId) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) ? prev.filter(g => g !== goalId) : [...prev, goalId]
    );
  };

  const calculateDosha = () => {
    const counts = [0, 0, 0];
    doshaAnswers.forEach(answer => counts[answer]++);
    const maxIndex = counts.indexOf(Math.max(...counts));
    const doshas = ['Vata', 'Pitta', 'Kapha'];
    setDosha(doshas[maxIndex]);
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const LotusFlower = ({ completed, total }) => {
    const petalsToFill = Math.floor((completed / total) * 8);
    
    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((petalIndex) => {
            const angle = (petalIndex * 45) - 90;
            const isFilled = petalIndex < petalsToFill;
            
            return (
              <g key={petalIndex}>
                <ellipse
                  cx="100"
                  cy="50"
                  rx="18"
                  ry="35"
                  fill={isFilled ? '#f59e0b' : '#fef3c7'}
                  stroke="#d97706"
                  strokeWidth="2"
                  transform={`rotate(${angle} 100 100)`}
                  opacity={isFilled ? '1' : '0.5'}
                  style={{ transition: 'all 0.7s ease-out' }}
                />
              </g>
            );
          })}
          
          {[0, 1, 2, 3, 4, 5, 6, 7].map((petalIndex) => {
            const angle = (petalIndex * 45) - 67.5;
            const isFilled = petalIndex < petalsToFill;
            
            return (
              <g key={`inner-${petalIndex}`}>
                <ellipse
                  cx="100"
                  cy="70"
                  rx="12"
                  ry="20"
                  fill={isFilled ? '#fbbf24' : '#fef9e7'}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  transform={`rotate(${angle} 100 100)`}
                  opacity={isFilled ? '0.8' : '0.4'}
                  style={{ transition: 'all 0.7s ease-out' }}
                />
              </g>
            );
          })}
          
          <circle
            cx="100"
            cy="100"
            r="20"
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="2"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-serif text-white font-bold drop-shadow">{completed}/{total}</div>
          </div>
        </div>
      </div>
    );
  };

  if (screen === 'onboarding') {
    if (onboardingStep === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="relative">
              <Flower2 className="w-24 h-24 mx-auto text-amber-600 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-ping"></div>
              </div>
            </div>
            <h1 className="text-4xl font-serif text-amber-900">Dincharya</h1>
            <p className="text-lg text-amber-700">Your daily Ayurvedic companion</p>
            <input
              type="text"
              placeholder="What's your name?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-amber-200 focus:border-amber-400 outline-none text-center text-amber-900"
            />
            <button
              onClick={() => userName && setOnboardingStep(1)}
              disabled={!userName}
              className="w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Begin Journey
            </button>
          </div>
        </div>
      );
    }

    if (onboardingStep === 1) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-6">
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-serif text-amber-900 text-center">What's your intention?</h2>
            <p className="text-amber-700 text-center">Choose what resonates with you</p>
            <div className="space-y-3">
              {goals.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition flex items-center gap-4 ${
                    selectedGoals.includes(goal.id)
                      ? 'bg-amber-100 border-amber-400'
                      : 'bg-white border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-2xl">{goal.icon}</span>
                  <span className="text-amber-900 font-medium">{goal.text}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setOnboardingStep(2)}
              disabled={selectedGoals.length === 0}
              className="w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    if (onboardingStep === 2) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-6">
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-serif text-amber-900 text-center">Discover Your Dosha</h2>
            <p className="text-amber-700 text-center">Answer a few simple questions</p>
            {doshaAnswers.length < doshaQuestions.length ? (
              <div className="space-y-4">
                <p className="text-lg text-amber-900 font-medium">
                  {doshaQuestions[doshaAnswers.length].q}
                </p>
                {doshaQuestions[doshaAnswers.length].a.map((answer, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDoshaAnswers([...doshaAnswers, idx])}
                    className="w-full p-4 bg-white rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition text-amber-900"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <button
                  onClick={() => {
                    calculateDosha();
                    setOnboardingStep(3);
                  }}
                  className="w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition"
                >
                  See My Dosha
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (onboardingStep === 3) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-6 flex items-center justify-center">
          <div className="max-w-md w-full text-center space-y-6">
            <Flower2 className="w-20 h-20 mx-auto text-amber-600" />
            <h2 className="text-3xl font-serif text-amber-900">Your Dosha: {dosha}</h2>
            <p className="text-amber-700">
              {dosha === 'Vata' && 'Light, creative, energetic. Balance with warmth and routine.'}
              {dosha === 'Pitta' && 'Intense, focused, driven. Balance with cooling and relaxation.'}
              {dosha === 'Kapha' && 'Grounded, steady, nurturing. Balance with movement and lightness.'}
            </p>
            <button
              onClick={() => setScreen('home')}
              className="w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition"
            >
              Start My Dincharya
            </button>
          </div>
        </div>
      );
    }
  }

  if (screen === 'home') {
    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? 'Good Morning' : timeOfDay < 17 ? 'Good Afternoon' : 'Good Evening';
    const GreetingIcon = timeOfDay < 12 ? Sunrise : timeOfDay < 17 ? Sun : Moon;
    const completedTasksCount = Object.values(completedTasks).filter(Boolean).length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GreetingIcon className="w-6 h-6" />
                <h1 className="text-2xl font-serif">{greeting}, {userName}</h1>
              </div>
              <p className="text-amber-100 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <button
              onClick={() => setScreen('info')}
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
            >
              <Info className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 -mt-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-amber-200">
            <h3 className="text-center text-amber-900 font-semibold mb-2">Today's Progress</h3>
            <LotusFlower completed={completedTasksCount} total={rituals.length} />
            <p className="text-center text-sm text-amber-600 mt-2">
              {completedTasksCount === rituals.length 
                ? '🎉 All rituals complete! Well done!' 
                : 'Each petal blooms with your dedication'}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4 mt-4">
          <h2 className="text-xl font-serif text-amber-900 mb-4">Today's Dincharya</h2>
          
          {rituals.map(ritual => {
            const Icon = ritual.icon;
            const isCompleted = completedTasks[ritual.id];
            return (
              <button
                key={ritual.id}
                onClick={() => {
                  if (ritual.hasSpecialScreen) {
                    if (ritual.id === 'meditation') setScreen('meditation');
                    else if (ritual.id === 'journal') setScreen('journal');
                    else if (ritual.id === 'gita') setScreen('gita');
                    else if (ritual.id === 'listening') setScreen('listening');
                    else if (ritual.id === 'movement') setScreen('movement');
                  } else {
                    toggleTask(ritual.id);
                  }
                }}
                className={`w-full p-4 rounded-2xl shadow-md transition transform hover:scale-102 ${
                  isCompleted ? 'bg-green-50 border-2 border-green-300' : 'bg-white border-2 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isCompleted ? 'bg-green-200' : 'bg-amber-100'}`}>
                    <Icon className={`w-6 h-6 ${isCompleted ? 'text-green-700' : 'text-amber-700'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold ${isCompleted ? 'text-green-900' : 'text-amber-900'}`}>
                      {ritual.title}
                    </h3>
                    <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-amber-600'}`}>
                      {ritual.desc}
                    </p>
                    {ritual.id === 'wake' && (
                      <div className={`text-xs mt-2 ${isCompleted ? 'text-green-500' : 'text-amber-500'}`}>
                        ☀️ Take 3 deep breaths • 🙏 "Thank you God for this beautiful day, please engage me in Your service" • 🌅 Step outside for 2 minutes
                      </div>
                    )}
                    {ritual.id === 'cleanse' && (
                      <div className={`text-xs mt-2 ${isCompleted ? 'text-green-500' : 'text-amber-500'}`}>
                        💧 Drink warm water → 🚽 Evacuate → 🪥 Brush teeth → 👅 Tongue scraping → 💆 Abhyanga (oil massage) → 🛁 Bath
                      </div>
                    )}
                    {ritual.id === 'eating' && (
                      <div className={`text-xs mt-2 ${isCompleted ? 'text-green-500' : 'text-amber-500'}`}>
                        📵 Eat without screens • 🙏 Say a gratitude prayer • 🧘 Sit quietly for 2 minutes after eating
                      </div>
                    )}
                    <span className="text-xs text-amber-500">{ritual.time}</span>
                  </div>
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    ritual.hasSpecialScreen ? (
                      <ChevronRight className="w-6 h-6 text-amber-400" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-amber-300"></div>
                    )
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-6 space-y-4 pb-20">
          <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-md">
            <h3 className="font-semibold text-amber-900 mb-3">How are you feeling?</h3>
            <div className="flex justify-around">
              {['😊', '😌', '😐', '😔', '😴'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setMoodSelected(emoji)}
                  className={`text-3xl transition transform hover:scale-110 ${
                    moodSelected === emoji ? 'scale-125' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-2xl border-2 border-green-200 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Seva of the Day</h3>
            </div>
            <p className="text-green-700">Smile at someone and make their day brighter ✨</p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'info') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-6">
        <button
          onClick={() => setScreen('home')}
          className="mb-6 text-amber-700 hover:text-amber-900"
        >
          ← Back to Home
        </button>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Info className="w-20 h-20 mx-auto text-amber-600 mb-3" />
            <h2 className="text-3xl font-serif text-amber-900">Information</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-lg space-y-6">
            <div>
              <h3 className="font-semibold text-amber-900 mb-3 text-lg">About Dincharya</h3>
              <p className="text-amber-800 leading-relaxed">
                Dincharya is your daily Ayurvedic companion, integrating ancient wisdom with modern spirituality. Based on the principles of Ayurveda and Bhakti Yoga, this app helps you establish a balanced daily routine aligned with natural rhythms.
              </p>
            </div>

            <div className="border-t-2 border-amber-100 pt-6">
              <h3 className="font-semibold text-amber-900 mb-4 text-lg">Contact Information</h3>
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl">
                  <p className="text-sm text-amber-700 mb-2">For personal consultation or more information, please contact:</p>
                  <div className="space-y-2">
                    <a 
                      href="mailto:rasakelirns@gmail.com"
                      className="flex items-center gap-2 text-amber-900 font-medium hover:text-amber-700 transition"
                    >
                      <span>📧</span>
                      <span>rasakelirns@gmail.com</span>
                    </a>
                    <a 
                      href="tel:2144543949"
                      className="flex items-center gap-2 text-amber-900 font-medium hover:text-amber-700 transition"
                    >
                      <span>📞</span>
                      <span>(214) 454-3949</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-amber-100 pt-6">
              <h3 className="font-semibold text-amber-900 mb-3 text-lg">Your Profile</h3>
              <div className="space-y-2 text-amber-800">
                <p><span className="font-medium">Name:</span> {userName}</p>
                <p><span className="font-medium">Dosha:</span> {dosha}</p>
                <p><span className="font-medium">Goals:</span> {selectedGoals.map(g => goals.find(goal => goal.id === g)?.text).join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'meditation') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 p-6">
        <button
          onClick={() => setScreen('home')}
          className="mb-6 text-indigo-700 hover:text-indigo-900"
        >
          ← Back
        </button>
        
        <div className="max-w-md mx-auto text-center space-y-8">
          <Wind className="w-20 h-20 mx-auto text-indigo-600 animate-pulse" />
          <h2 className="text-3xl font-serif text-indigo-900">Meditation & Breathwork</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border-2 border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-3">Hare Krishna Mantra Meditation</h3>
              <p className="text-sm text-indigo-600 mb-4">Chant along with Srila Prabhupada</p>
              
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl mb-4">
                <iframe
                  width="100%"
                  height="180"
                  src="https://www.youtube.com/embed/N74o3G_cTAA"
                  title="Hare Krishna Chanting by Srila Prabhupada"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
                <p className="text-xs text-orange-700 mt-2">Srila Prabhupada - Hare Krishna Maha Mantra</p>
              </div>
              
              <div className="bg-indigo-50 p-5 rounded-xl">
                <h4 className="font-semibold text-indigo-900 mb-3">Japa Mala Counter</h4>
                <div className="relative">
                  <div className="text-6xl font-serif text-indigo-700 mb-2">{beadCount}</div>
                  <p className="text-sm text-indigo-600 mb-4">of 108 beads</p>
                  
                  <div className="w-full h-4 bg-indigo-200 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${(beadCount / 108) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    {!isChanting ? (
                      <button
                        onClick={() => setIsChanting(true)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Chanting
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsChanting(false)}
                        className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition flex items-center gap-2"
                      >
                        <Pause className="w-4 h-4" />
                        Pause
                      </button>
                    )}
                    
                    <button
                      onClick={() => setBeadCount(0)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <p className="text-xs text-indigo-500 mt-3">
                    {isChanting ? '🙏 Bead advances every 5 seconds' : 'Each bead = one mantra repetition'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800 font-medium mb-2">The Maha Mantra:</p>
                <p className="text-purple-700 text-sm italic">
                  Hare Krishna Hare Krishna<br/>
                  Krishna Krishna Hare Hare<br/>
                  Hare Rama Hare Rama<br/>
                  Rama Rama Hare Hare
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                toggleTask('meditation');
                setScreen('home');
              }}
              className="w-full py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              Complete Meditation
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'gita') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6">
        <button
          onClick={() => {
            toggleTask('gita');
            setScreen('home');
          }}
          className="mb-6 text-purple-700 hover:text-purple-900"
        >
          ← Back
        </button>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Book className="w-20 h-20 mx-auto text-purple-600 mb-3" />
            <h2 className="text-3xl font-serif text-purple-900">Bhagavad Gita As It Is</h2>
            <p className="text-purple-700">by A.C. Bhaktivedanta Swami Srila Prabhupada</p>
            <p className="text-sm text-purple-600 mt-2">Chapter {gitaVerse.chapter}, Verse {gitaVerse.verse}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-purple-600 mb-2">SANSKRIT</h3>
              <p className="text-2xl font-serif text-purple-900 leading-relaxed">{gitaVerse.sanskrit}</p>
            </div>
            
            <div className="border-t-2 border-purple-100 pt-4">
              <h3 className="text-sm font-semibold text-purple-600 mb-2">TRANSLATION</h3>
              <p className="text-lg text-purple-800 leading-relaxed">{gitaVerse.translation}</p>
            </div>
            
            <div className="border-t-2 border-purple-100 pt-4">
              <h3 className="text-sm font-semibold text-purple-600 mb-2">PURPORT BY SRILA PRABHUPADA</h3>
              <p className="text-purple-700 leading-relaxed">{gitaVerse.purport}</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              toggleTask('gita');
              setScreen('home');
            }}
            className="w-full py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            Complete Reading
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'listening') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-100 p-6">
        <button
          onClick={() => {
            toggleTask('listening');
            setScreen('home');
          }}
          className="mb-6 text-orange-700 hover:text-orange-900"
        >
          ← Back
        </button>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Music className="w-20 h-20 mx-auto text-orange-600 mb-3" />
            <h2 className="text-3xl font-serif text-orange-900">Daily Listening</h2>
            <p className="text-orange-700">Wisdom from HH Radhanath Swami Maharaj</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-lg space-y-4">
            <h3 className="text-xl font-semibold text-orange-900 text-center mb-4">{currentVideo.title}</h3>
            
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.id}`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="text-sm text-orange-700 text-center">
                💫 Take a moment to reflect on these teachings and how you can apply them in your daily life
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              toggleTask('listening');
              setScreen('home');
            }}
            className="w-full py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
          >
            Complete Listening
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'movement') {
    const doshaExercises = {
      Vata: {
        color: 'blue',
        suryaNamaskar: { count: 6, speed: 'slow' },
        poses: [
          { name: 'Camel Pose (Ustrasana)', desc: 'Opens heart, grounding' },
          { name: 'Cat & Cow', desc: 'Gentle spinal movement' },
          { name: 'Seated Forward Bend', desc: 'Calming, introspective' }
        ],
        note: 'Slow, gentle exercise to ground Vata energy'
      },
      Pitta: {
        color: 'red',
        suryaNamaskar: { count: 10, speed: 'moderate' },
        poses: [
          { name: 'Bridge Pose', desc: 'Cooling, opens chest' },
          { name: 'Fish Pose', desc: 'Releases tension' },
          { name: 'Triangle to Half Moon', desc: 'Balancing sequence' }
        ],
        note: 'Moderate, calming exercise to cool Pitta intensity'
      },
      Kapha: {
        color: 'green',
        suryaNamaskar: { count: 8, speed: 'fast' },
        poses: [
          { name: 'Bridge Pose', desc: 'Energizing backbend' },
          { name: 'Warrior Series (I, II, III)', desc: 'Builds strength' },
          { name: 'Tree Pose', desc: 'Balance and focus' }
        ],
        note: 'Vigorous exercise to energize Kapha'
      }
    };

    const exercise = doshaExercises[dosha];

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-100 p-6">
        <button
          onClick={() => {
            toggleTask('movement');
            setScreen('home');
          }}
          className="mb-6 text-green-700 hover:text-green-900"
        >
          ← Back
        </button>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Activity className="w-20 h-20 mx-auto text-green-600 mb-3" />
            <h2 className="text-3xl font-serif text-green-900">Movement Practice</h2>
            <p className="text-green-700">Dosha-specific yoga for {dosha}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-xl border-2 border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">☀️</span>
                Surya Namaskar (Sun Salutations)
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 font-medium">{exercise.suryaNamaskar.count} rounds</p>
                  <p className="text-sm text-gray-600 capitalize">{exercise.suryaNamaskar.speed} pace</p>
                </div>
                <div className="text-4xl">🧘</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-900 mb-4">Additional Poses for {dosha}</h3>
              <div className="space-y-3">
                {exercise.poses.map((pose, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                    <span className="text-2xl">🌿</span>
                    <div>
                      <h4 className="font-medium text-green-900">{pose.name}</h4>
                      <p className="text-sm text-green-600">{pose.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
              <p className="text-amber-800 text-sm text-center">
                💡 {exercise.note}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              toggleTask('movement');
              setScreen('home');
            }}
            className="w-full py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Complete Movement Practice
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'journal') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 p-6">
        <button
          onClick={() => setScreen('home')}
          className="mb-6 text-slate-700 hover:text-slate-900"
        >
          ← Back
        </button>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Moon className="w-16 h-16 mx-auto text-slate-600 mb-3" />
            <h2 className="text-3xl font-serif text-slate-900">Night Journal</h2>
            <p className="text-slate-600">Reflect on your day with gratitude</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-lg space-y-6">
            <div>
              <label className="block text-slate-700 font-medium mb-2">What brought you joy today?</label>
              <textarea
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 outline-none resize-none"
                rows="3"
                placeholder="Write your thoughts..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-slate-700 font-medium mb-2">What did you learn?</label>
              <textarea
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 outline-none resize-none"
                rows="3"
                placeholder="Write your thoughts..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-slate-700 font-medium mb-2">What can you release?</label>
              <textarea
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 outline-none resize-none"
                rows="3"
                placeholder="Let go of what no longer serves you..."
              ></textarea>
            </div>
            
            <button
              onClick={() => {
                toggleTask('journal');
                setScreen('home');
              }}
              className="w-full py-3 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition"
            >
              Save & Complete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DincharyaApp;