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
      purport: "This verse teaches detachment from results while remaining engaged in duty. Work performed as service to Krishna without attachment to outcomes leads to spiritual progress and inner peace."
    },
    {
      chapter: 2,
      verse: 62,
      sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते। सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥",
      translation: "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
      purport: "This verse describes the downward spiral of material consciousness. By meditating on sense objects, we develop attachment, then desire, then frustration and anger when desires are unfulfilled."
    },
    {
      chapter: 2,
      verse: 71,
      sanskrit: "विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः। निर्ममो निरहङ्कारः स शान्तिमधिगच्छति॥",
      translation: "A person who has given up all desires for sense gratification, who lives free from desires, who has given up all sense of proprietorship and is devoid of false ego—he alone can attain real peace.",
      purport: "True peace comes from renouncing material desires and false ego. When we understand nothing is ours and serve without personal motivation, we experience genuine tranquility."
    },
    {
      chapter: 3,
      verse: 27,
      sanskrit: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः। अहङ्कारविमूढात्मा कर्ताहमिति मन्यते॥",
      translation: "The spirit soul bewildered by the influence of false ego thinks himself the doer of activities that are in actuality carried out by the three modes of material nature.",
      purport: "Under illusion, we think we are the doers of all actions. In reality, material nature performs activities through our body and mind. Understanding this frees us from false responsibility."
    },
    {
      chapter: 4,
      verse: 7,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
      translation: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
      purport: "Krishna promises to appear whenever dharma declines. He comes to protect devotees, annihilate miscreants, and reestablish religious principles in various forms throughout history."
    },
    {
      chapter: 4,
      verse: 11,
      sanskrit: "ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम्। मम वर्त्मानुवर्तन्ते मनुष्याः पार्थ सर्वशः॥",
      translation: "As all surrender unto Me, I reward them accordingly. Everyone follows My path in all respects, O son of Pritha.",
      purport: "Krishna reciprocates with us according to our surrender. Whatever path we follow ultimately leads to Him, though the directness and speed of realization varies."
    },
    {
      chapter: 5,
      verse: 29,
      sanskrit: "भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम्। सुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति॥",
      translation: "A person in full consciousness of Me, knowing Me to be the ultimate beneficiary of all sacrifices and austerities, the Supreme Lord of all planets and demigods, and the benefactor and well-wisher of all living entities, attains peace from the pangs of material miseries.",
      purport: "Understanding Krishna as the enjoyer of all offerings, controller of everything, and friend of all beings brings deep peace and freedom from material suffering."
    },
    {
      chapter: 6,
      verse: 5,
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
      translation: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.",
      purport: "We are responsible for our own elevation or degradation. The mind can be our greatest friend leading to liberation, or our worst enemy binding us to material existence."
    },
    {
      chapter: 6,
      verse: 35,
      sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्। अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥",
      translation: "O mighty-armed son of Kunti, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.",
      purport: "Though controlling the mind is challenging, it can be achieved through persistent spiritual practice and detachment from material desires. Regular practice brings the mind under control."
    },
    {
      chapter: 7,
      verse: 14,
      sanskrit: "दैवी ह्येषा गुणमयी मम माया दुरत्यया। मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते॥",
      translation: "This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me can easily cross beyond it.",
      purport: "Material illusion is extremely powerful and cannot be conquered by our own effort. Only by surrendering to Krishna can we transcend maya's influence."
    },
    {
      chapter: 7,
      verse: 19,
      sanskrit: "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते। वासुदेवः सर्वमिति स महात्मा सुदुर्लभः॥",
      translation: "After many births and deaths, he who is actually in knowledge surrenders unto Me, knowing Me to be the cause of all causes and all that is. Such a great soul is very rare.",
      purport: "After many lifetimes of spiritual evolution, one finally realizes that Krishna is everything and surrenders. Such realized souls are extremely rare."
    },
    {
      chapter: 8,
      verse: 5,
      sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्। यः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥",
      translation: "And whoever, at the end of his life, quits his body remembering Me alone at once attains My nature. Of this there is no doubt.",
      purport: "Our consciousness at death determines our next destination. One who remembers Krishna at death attains His supreme abode without question."
    },
    {
      chapter: 9,
      verse: 22,
      sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
      translation: "But those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have.",
      purport: "Krishna personally takes care of devotees who worship Him exclusively. He provides what they need and protects what they possess, freeing them from material anxiety."
    },
    {
      chapter: 9,
      verse: 26,
      sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति। तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
      translation: "If one offers Me with love and devotion a leaf, a flower, fruit or water, I will accept it.",
      purport: "Krishna accepts even the simplest offerings when given with pure devotion. Love is the essential ingredient, not the material value of the offering."
    },
    {
      chapter: 9,
      verse: 27,
      sanskrit: "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्। यत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥",
      translation: "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kunti, as an offering to Me.",
      purport: "Every action can become devotional service when offered to Krishna. By dedicating all activities to Him, ordinary life becomes spiritual practice."
    },
    {
      chapter: 10,
      verse: 9,
      sanskrit: "मच्चित्ता मद्गतप्राणा बोधयन्तः परस्परम्। कथयन्तश्च मां नित्यं तुष्यन्ति च रमन्ति च॥",
      translation: "The thoughts of My pure devotees dwell in Me, their lives are fully devoted to My service, and they derive great satisfaction and bliss from always enlightening one another and conversing about Me.",
      purport: "Advanced devotees find complete satisfaction in Krishna consciousness. They constantly discuss Krishna with each other and experience transcendental happiness."
    },
    {
      chapter: 10,
      verse: 10,
      sanskrit: "तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम्। ददामि बुद्धियोगं तं येन मामुपयान्ति ते॥",
      translation: "To those who are constantly devoted to serving Me with love, I give the understanding by which they can come to Me.",
      purport: "Krishna gives intelligence to sincere devotees, enabling them to understand how to reach Him. He directly guides those who serve Him with love."
    },
    {
      chapter: 12,
      verse: 13,
      sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
      translation: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant...",
      purport: "A devotee is characterized by universal friendliness and freedom from envy. They see all beings equally and remain balanced in all circumstances."
    },
    {
      chapter: 13,
      verse: 8,
      sanskrit: "अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम्। आचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः॥",
      translation: "Humility; pridelessness; nonviolence; tolerance; simplicity; approaching a bona fide spiritual master; cleanliness; steadiness; self-control...",
      purport: "These qualities constitute real knowledge. Developing humility, nonviolence, and approaching a genuine spiritual teacher are essential for spiritual advancement."
    },
    {
      chapter: 14,
      verse: 27,
      sanskrit: "ब्रह्मणो हि प्रतिष्ठाहममृतस्याव्ययस्य च। शाश्वतस्य च धर्मस्य सुखस्यैकान्तिकस्य च॥",
      translation: "And I am the basis of the impersonal Brahman, which is immortal, imperishable and eternal and is the constitutional position of ultimate happiness.",
      purport: "Krishna is the source of the impersonal Brahman effulgence. He is the original person from whom eternal dharma and ultimate bliss emanate."
    },
    {
      chapter: 15,
      verse: 7,
      sanskrit: "ममैवांशो जीवलोके जीवभूतः सनातनः। मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति॥",
      translation: "The living entities in this conditioned world are My eternal fragmental parts. Due to conditioned life, they are struggling very hard with the six senses, which include the mind.",
      purport: "All souls are eternal parts of Krishna. In material existence, they struggle with the mind and senses, but they remain His eternal parts."
    },
    {
      chapter: 15,
      verse: 15,
      sanskrit: "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च। वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम्॥",
      translation: "I am seated in everyone's heart, and from Me come remembrance, knowledge and forgetfulness. By all the Vedas, I am to be known. Indeed, I am the compiler of Vedanta and the knower of the Vedas.",
      purport: "Krishna resides in all hearts and controls memory and knowledge. All Vedic literature ultimately points to understanding Him as the Supreme Personality."
    },
    {
      chapter: 16,
      verse: 1,
      sanskrit: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः। दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥",
      translation: "Fearlessness; purification of one's existence; cultivation of spiritual knowledge; charity; self-control; performance of sacrifice; study of the Vedas; austerity; simplicity...",
      purport: "These divine qualities characterize those born with spiritual inclinations. Cultivating fearlessness, purity, and charity leads to spiritual advancement."
    },
    {
      chapter: 16,
      verse: 21,
      sanskrit: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः। कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥",
      translation: "There are three gates leading to this hell—lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
      purport: "Lust, anger, and greed are the three gates to hell that destroy the soul. One must abandon these material qualities to progress spiritually."
    },
    {
      chapter: 17,
      verse: 28,
      sanskrit: "अश्रद्धया हुतं दत्तं तपस्तप्तं कृतं च यत्। असदित्युच्यते पार्थ न च तत्प्रेत्य नो इह॥",
      translation: "Anything done as sacrifice, charity or penance without faith in the Supreme, O Partha, is impermanent. It is called asat and is useless both in this life and the next.",
      purport: "Actions performed without faith in Krishna produce only temporary results. Real spiritual practice requires sincere faith to yield eternal benefit."
    },
    {
      chapter: 18,
      verse: 5,
      sanskrit: "यज्ञदानतपःकर्म न त्याज्यं कार्यमेव तत्। यज्ञो दानं तपश्चैव पावनानि मनीषिणाम्॥",
      translation: "Acts of sacrifice, charity and penance are not to be given up; they must be performed. Indeed, sacrifice, charity and penance purify even the great souls.",
      purport: "Never abandon sacrifice, charity, and austerity—these purify even advanced souls. Such practices should continue throughout one's spiritual journey."
    },
    {
      chapter: 18,
      verse: 54,
      sanskrit: "ब्रह्मभूतः प्रसन्नात्मा न शोचति न काङ्क्षति। समः सर्वेषु भूतेषु मद्भक्तिं लभते पराम्॥",
      translation: "One who is thus transcendentally situated at once realizes the Supreme Brahman and becomes fully joyful. He never laments or desires to have anything. He is equally disposed toward every living entity. In that state he attains pure devotional service unto Me.",
      purport: "Upon realizing one's spiritual nature, one becomes peaceful and equal to all. This brahma-bhuta platform is the beginning of pure devotional service."
    },
    {
      chapter: 18,
      verse: 55,
      sanskrit: "भक्त्या मामभिजानाति यावान्यश्चास्मि तत्त्वतः। ततो मां तत्त्वतो ज्ञात्वा विशते तदनन्तरम्॥",
      translation: "One can understand Me as I am, as the Supreme Personality of Godhead, only by devotional service. And when one is in full consciousness of Me by such devotion, he can enter into the kingdom of God.",
      purport: "Krishna can be truly understood only through bhakti. Devotional service alone reveals His actual nature and grants entrance to His eternal abode."
    },
    {
      chapter: 18,
      verse: 65,
      sanskrit: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु। मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे॥",
      translation: "Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.",
      purport: "Krishna personally promises that those who always think of Him, worship Him, and offer obeisances will certainly reach Him. This is His guarantee to sincere devotees."
    },
    {
      chapter: 18,
      verse: 66,
      sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
      translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
      purport: "This is the ultimate instruction: surrender completely to Krishna. He promises to free us from all karma and sins. We need only take shelter of Him without hesitation."
    }
  ];

  const [currentVerseIndex] = useState(Math.floor(Math.random() * gitaVerses.length));
  const gitaVerse = gitaVerses[currentVerseIndex];

  const radhanathVideos = [
    { id: "jO47JYkk8gY", title: "The Art of Compassion and Love" },
    { id: "5fV_jJhK3fM", title: "The Power of Gratitude" },
    { id: "Bc5gwqUxhFQ", title: "Finding Inner Peace" },
    { id: "kE2h48oVhBo", title: "Service: The Essence of Love" },
    { id: "vT6Pe5YG4YE", title: "Bhakti Yoga - Path of Devotion" },
    { id: "N9bfNU5LSOI", title: "Humility: Foundation of Spiritual Life" },
    { id: "w8KdC-9WzJk", title: "Devotion and Surrender" }
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

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-2xl border-2 border-amber-300 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-amber-600 fill-amber-600" />
              <h3 className="font-semibold text-amber-900">Support This Work</h3>
            </div>
            <p className="text-amber-800 text-sm mb-3">
              If this app has helped you on your spiritual journey, consider supporting its continued development and maintenance.
            </p>
            <div className="bg-white p-4 rounded-xl border-2 border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💰</span>
                <h4 className="font-semibold text-amber-900">Donate via Zelle</h4>
              </div>
              <p className="text-amber-700 text-sm mb-1">Send to:</p>
              <a 
                href="mailto:info@consciouslifecenter.com"
                className="text-amber-900 font-medium hover:text-amber-700 transition break-all"
              >
                info@consciouslifecenter.com
              </a>
            </div>
            <p className="text-xs text-amber-600 text-center mt-3">
              🙏 Your generosity helps keep this service free for everyone
            </p>
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

            <div className="border-t-2 border-amber-100 pt-6">
              <h3 className="font-semibold text-amber-900 mb-4 text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                Support This Work
              </h3>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl">
                <p className="text-amber-800 text-sm mb-4 leading-relaxed">
                  If Dincharya has helped you establish a more balanced and spiritual daily routine, please consider supporting its development. Your generosity helps keep this service free and accessible to everyone.
                </p>
                <div className="bg-white p-4 rounded-xl border-2 border-amber-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-3xl">💰</span>
                    <h4 className="font-semibold text-amber-900 text-lg">Donate via Zelle</h4>
                  </div>
                  <p className="text-amber-700 text-sm mb-2">Send your contribution to:</p>
                  <a 
                    href="mailto:info@consciouslifecenter.com"
                    className="text-amber-900 font-semibold text-lg hover:text-amber-700 transition break-all block"
                  >
                    info@consciouslifecenter.com
                  </a>
                </div>
                <p className="text-xs text-amber-600 text-center mt-4">
                  🙏 Every contribution, no matter how small, is deeply appreciated
                </p>
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
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Music className="w-20 h-20 mx-auto text-orange-600 mb-3" />
            <h2 className="text-3xl font-serif text-orange-900">Daily Listening</h2>
            <p className="text-orange-700">Wisdom from HH Radhanath Swami Maharaj</p>
            <p className="text-sm text-orange-600 mt-2">Today's Teaching - Day {getDailyVideoIndex() + 1}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-lg space-y-4">
            <h3 className="text-xl font-semibold text-orange-900 text-center mb-4">{currentVideo.title}</h3>
            
            <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <p className="text-sm text-orange-700 text-center">
                💫 Take a moment to reflect on these teachings and how you can apply them in your daily life
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-orange-200">
              <p className="text-xs text-orange-600 text-center mb-2">
                🌟 A new video is selected for you each day from the Radhanath Swami playlist
              </p>
              <a
                href="https://www.youtube.com/playlist?list=PLsn_wC0BJK33gHtylMLhqgOwT0lfBMpcY"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-orange-700 hover:text-orange-900 font-medium underline text-sm"
              >
                🎬 View Full Playlist on YouTube →
              </a>
            </div>
          </div>
          
          <button
            onClick={() => {
              toggleTask('listening');
              setScreen('home');
            }}
            className="w-full py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition font-semibold shadow-md"
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
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-6">
        <button
          onClick={() => setScreen('home')}
          className="mb-6 text-indigo-700 hover:text-indigo-900"
        >
          ← Back
        </button>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Moon className="w-16 h-16 mx-auto text-indigo-600 mb-3" />
            <h2 className="text-3xl font-serif text-indigo-900">Evening Gratitude Journal</h2>
            <p className="text-indigo-600">Reflect on the blessings of today</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-2 border-indigo-200 shadow-lg space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl mb-4">
              <p className="text-purple-800 text-sm italic text-center">
                "Gratitude turns what we have into enough, and more. It turns denial into acceptance, chaos into order, confusion into clarity... it makes sense of our past, brings peace for today, and creates a vision for tomorrow." - Melody Beattie
              </p>
            </div>

            <div>
              <label className="block text-indigo-900 font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">🙏</span>
                What are you grateful for today?
              </label>
              <p className="text-sm text-indigo-600 mb-2">List 3-5 things, people, or moments you're thankful for</p>
              <textarea
                className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 outline-none resize-none"
                rows="4"
                placeholder="I am grateful for..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-indigo-900 font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">✨</span>
                What was a moment of grace or blessing today?
              </label>
              <p className="text-sm text-indigo-600 mb-2">A special moment, synchronicity, or Krishna's mercy</p>
              <textarea
                className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 outline-none resize-none"
                rows="3"
                placeholder="Today I experienced..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-indigo-900 font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">💫</span>
                How did you serve others today?
              </label>
              <p className="text-sm text-indigo-600 mb-2">Acts of kindness, service, or devotion</p>
              <textarea
                className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 outline-none resize-none"
                rows="3"
                placeholder="I served by..."
              ></textarea>
            </div>

            <div>
              <label className="block text-indigo-900 font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">🌟</span>
                What lesson or insight did you receive?
              </label>
              <p className="text-sm text-indigo-600 mb-2">Wisdom gained from experiences or spiritual practice</p>
              <textarea
                className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 outline-none resize-none"
                rows="3"
                placeholder="I learned that..."
              ></textarea>
            </div>

            <div>
              <label className="block text-indigo-900 font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">🌙</span>
                What intention do you set for tomorrow?
              </label>
              <p className="text-sm text-indigo-600 mb-2">How will you continue your spiritual journey?</p>
              <textarea
                className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 outline-none resize-none"
                rows="3"
                placeholder="Tomorrow I will..."
              ></textarea>
            </div>
            
            <button
              onClick={() => {
                toggleTask('journal');
                setScreen('home');
              }}
              className="w-full py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-semibold shadow-md"
            >
              Save & Complete Gratitude Practice 🙏
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DincharyaApp;