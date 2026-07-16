/**
 * Articles published by Lumen.aid. New pieces go on Medium first; add them
 * here too so people can read them on the site.
 *
 * Block types: { t: 'p', text } paragraph · { t: 'h2', text } section
 * heading · { t: 'list', items: [] } bulleted list.
 */

export const MEDIUM_URL = 'https://medium.com/@saadnizami114'

export function readingMinutes(article) {
  const words = article.blocks
    .map((b) => (b.t === 'list' ? b.items.join(' ') : b.text))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const ARTICLES = [
  {
    slug: 'diabetic-retinopathy',
    title: 'What Your Diabetes Isn’t Telling You: Diabetic Retinopathy',
    author: 'Maryam Faraz',
    dek: 'Millions of Pakistanis living with diabetes are at risk of an eye disease most have never heard of. Here is how it works and how to stay ahead of it.',
    blocks: [
      {
        t: 'p',
        text: 'Approximately 34.5 million adults in Pakistan are living with diabetes. This brings almost 11.4 million people at risk of developing an eye disease that can potentially lead to vision loss, and many of us don’t even know about it.',
      },
      { t: 'h2', text: 'Anatomy and definition' },
      {
        t: 'p',
        text: 'Diabetic retinopathy (DR) is an eye complication caused by long-term high blood sugar, which damages blood vessels in the retina. It affects approximately one third of all people living with diabetes and is the leading cause of blindness among working-age adults. Worldwide, over 103 million adults are affected, and this burden is projected to exceed 160 million by 2045.',
      },
      {
        t: 'p',
        text: 'High blood glucose damages retinal blood vessels (a network of arteries that connect the sensitive layer of tissue of the eye that sends signals to your brain), causing them to weaken and leak blood and fluid into the retina. This swelling can cause a buildup of fluid called macular edema, leading to blurry vision.',
      },
      {
        t: 'p',
        text: 'In advanced stages, damaged vessels close off entirely, starving parts of the retina of blood. To compensate, the eye grows fragile, abnormal new blood vessels. These new vessels are weak and frequently bleed into the clear, gel-like substance in the center of the eye (the vitreous). This leaking, along with the resulting scar tissue, can cause severe vision changes or even retinal detachment.',
      },
      { t: 'h2', text: 'The two stages of diabetic eye disease' },
      {
        t: 'p',
        text: 'Non-Proliferative Diabetic Retinopathy (NPDR) is the early, most common stage of diabetic eye disease. Many patients with early NPDR experience no symptoms at all. However, as the disease progresses or if macular edema develops, patients may notice blurry vision, fluctuating vision, or trouble reading. NPDR is further classified into three stages:',
      },
      {
        t: 'list',
        items: [
          'Mild: minor blood vessel bulges.',
          'Moderate: noticeable blockages in blood vessels, leading to mild swelling.',
          'Severe: widespread blockage of blood vessels, which deprives the retina of blood and can accelerate progression to the more advanced Proliferative Diabetic Retinopathy (PDR).',
        ],
      },
      {
        t: 'p',
        text: 'Proliferative Diabetic Retinopathy (PDR) is the most advanced stage of diabetic eye disease. As PDR progresses you might notice a sudden increase in dark spots, blurry or fluctuating vision, sudden and severe vision loss, or blank and dark areas in your vision, with colors appearing washed out.',
      },
      { t: 'h2', text: 'Prevention and strategic management' },
      {
        t: 'p',
        text: 'According to the American Academy of Ophthalmology, up to 90% of diabetes-related vision loss can be prevented or delayed. While existing damage cannot be reversed, further worsening can be reduced by strict lifestyle and mindful choices. Some medical preventions include:',
      },
      {
        t: 'list',
        items: [
          'Targeted HbA1c: consistently keeping your Hemoglobin A1c within the target range set by your doctor is the most critical step. Studies like the Diabetes Control and Complications Trial (DCCT) show that a roughly 10% decrease in HbA1c substantially lowers the risk of retinopathy progression.',
          'Panretinal Photocoagulation (PRP): a laser procedure where the doctor uses laser beams to burn or shrink the irregular, abnormal blood vessels and treat oxygen-deprived areas of the retina. This signals the eye to stop generating the harmful new vessels.',
          'Anti-VEGF intravitreal injections: they block VEGF proteins directly, rapidly reducing retinal swelling and new blood vessel growth without permanently destroying peripheral retinal tissue.',
        ],
      },
      { t: 'h2', text: 'Lifestyle and everyday management' },
      {
        t: 'p',
        text: 'Proper nutrition, mindful exercise and complying with medical treatments (if the case is advanced) can easily slow down the progression of DR. DR is not only the result of diabetes but also high blood pressure and elevated cholesterol. Hence it is important to keep blood pressure well managed (typically below 130/80 mm Hg) by reducing sodium intake.',
      },
      {
        t: 'p',
        text: 'Not only this, base meals around leafy and nutrient dense choices that will prove to be eye-friendly. Patients may target Vitamin A, C, E and antioxidants.',
      },
      {
        t: 'p',
        text: 'And lastly, it is necessary to have annual eye examinations and tests with an ophthalmologist or retina specialist even if you feel fine.',
      },
      {
        t: 'p',
        text: 'Diabetic retinopathy is not bound to end in vision loss. With a combination of mindful choices and adherence to your doctor’s advice, your eyesight remains firmly in your hands. Don’t wait for your vision to change before you change the way you look at diabetes care.',
      },
    ],
  },
  {
    slug: 'glaucoma',
    title: 'Understanding the Number One Cause of Irreversible Blindness: Glaucoma',
    author: 'Maryam Faraz',
    dek: 'Half the people living with glaucoma have no idea they have it. Here is how the silent thief of sight works, and why early detection is everything.',
    blocks: [
      {
        t: 'p',
        text: 'Visual impairment and blindness present complex challenges to global public health, affecting not only the individual but world dynamics too. To effectively advocate for and support the visually impaired, it is essential to understand the clinical statistics and the biological mechanisms that drive this condition.',
      },
      { t: 'h2', text: 'Anatomy and definition' },
      {
        t: 'p',
        text: 'Glaucoma is a group of eye diseases that are usually due to intraocular hypertension (increased pressure inside the eye) or optic nerve damage, and if left untreated can lead to blindness. According to the World Health Organisation, glaucoma is the top reason for irreversible eye blindness and the second most common reason for overall blindness.',
      },
      {
        t: 'p',
        text: 'The human eye constantly produces a clear fluid (to clean itself) called the aqueous humour. This fluid is supposed to exit the eye through a drain at the edge of the eye. In conditions of glaucoma, this drain gets clogged up and the fluid is not drained. As the outer side of the eye cannot stretch, this fluid starts creating pressure inside the eye.',
      },
      {
        t: 'p',
        text: 'As the pressure builds up, it damages the most sensitive part of the eye: the optic nerve. The optic nerve is made up of a million tiny wire fibers and is the main data cable that sends pictures to your brain. As pressure builds, the wires lose blood flow and eventually die, and thus the brain stops receiving pictures: vision loss.',
      },
      { t: 'h2', text: 'The silent thief of sight' },
      {
        t: 'p',
        text: 'Glaucoma is also called the silent thief of sight, and this is because at first it is completely invisible to the patient. The human brain has a natural tendency to adapt to compensate for gaps in our visual field. Even if a few thousand nerves are damaged, the brain will simply interpolate data from surrounding areas.',
      },
      {
        t: 'p',
        text: 'Most patients, by the time of diagnosis, are already 40% affected by the condition. Globally, the leading cause of glaucoma blindness is not a lack of treatment but a lack of early diagnosis, as almost 50% of people living with it are completely unaware of having it.',
      },
      { t: 'h2', text: 'Recognising the signs' },
      {
        t: 'p',
        text: 'There are two major types of glaucoma: open-angle and acute angle-closure. There are no early symptoms for open-angle glaucoma. There is no pain, no redness and no sudden blurriness, as the pressure builds slowly and is spread across several years. This means the eye adapts to it, leaving the individual completely unaware. Whereas in acute angle-closure glaucoma, the eye’s drainage system experiences a sudden and complete collapse. The fluid is trapped instantly, causing intraocular pressure to spike rapidly. This may result in intense eye pain, severe headaches, nausea and even blurry vision.',
      },
      { t: 'h2', text: 'The mechanisms of prevention' },
      {
        t: 'p',
        text: 'It is established that the primary defense against this condition is early detection, and it is important to know that patients should not always rely on physical symptoms as alerts. Routine comprehensive eye exams like tonometry (a diagnostic eye test that measures your intraocular pressure, or the fluid pressure inside your eye) can detect changes in the earlier stages. While treatments like prostaglandin eye drops can help slow down disease progression, they cannot regenerate dead retinal ganglion cells. Hence, public health strategies must ensure accessible eye screenings to prevent irreversible blindness.',
      },
    ],
  },
]
