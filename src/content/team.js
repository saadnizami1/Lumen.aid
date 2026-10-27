/**
 * The team, by department. Order here is the order on the page.
 *
 * `lead: true` marks whoever heads a department. `role` is only set when it
 * says something a reader cannot infer from the department heading, so
 * members of a single-discipline department carry no repeated role label.
 * `iris` is the eye colour the department is drawn in, from the brand's
 * four illustration colours.
 */

export const DEPARTMENTS = [
  {
    name: 'Executive leadership',
    short: 'Leadership',
    iris: '#C63D3D',
    executive: true,
    members: [
      { name: 'Saad Nizami', role: 'President & Founder', lead: true },
      { name: 'Umer Arsalan', role: 'Vice President & Founder', lead: true },
      { name: 'Eesa Faisal', role: 'General Secretary', lead: true },
    ],
  },
  {
    name: 'Operations',
    short: 'Operations',
    iris: '#3E6FB3',
    members: [
      { name: 'Muhammad Hussain', role: 'Head of Operations', lead: true },
      { name: 'Daniyal Tariq', role: 'Head of Operations', lead: true },
    ],
  },
  {
    name: 'Research and development',
    short: 'Research',
    iris: '#35B48C',
    members: [
      {
        name: 'Maryam Faraz',
        role: 'Head of Research and Development',
        lead: true,
        // Wrote both explainers in the reading room.
        link: { to: '/articles', label: 'Writes our explainers' },
      },
      { name: 'Ibraheem Mansoor' },
      { name: 'Noor Fatima' },
    ],
  },
  {
    name: 'Content writing',
    short: 'Writing',
    iris: '#6B4A32',
    members: [
      { name: 'Mahnoor Asif', role: 'Head of Content Writing', lead: true },
      { name: 'Haris Ali' },
      { name: 'Ume Habiba' },
      { name: 'Saimak Baloch' },
    ],
  },
  {
    name: 'Logistics',
    short: 'Logistics',
    iris: '#C63D3D',
    members: [
      { name: 'Hamza Ahmed', role: 'Head of Logistics', lead: true },
      { name: 'Ahmad Adnan' },
      { name: 'Salaar Farrukh' },
      { name: 'Hamnah Faheem' },
      { name: 'Basim Yasir' },
      { name: 'Sahibzada Haider' },
      { name: 'Meeshal Umar' },
    ],
  },
  {
    name: 'Graphic designing',
    short: 'Design',
    iris: '#3E6FB3',
    members: [{ name: 'Taha Masood', role: 'Head of Graphic Designing', lead: true }],
  },
  {
    name: 'Media and social media',
    short: 'Media',
    iris: '#35B48C',
    members: [
      { name: 'Abdul Ahad', role: 'Head of Social Media', lead: true },
      { name: 'Zahra Ali' },
      { name: 'Zuhra Arsalan' },
    ],
  },
]

export const TEAM_SIZE = DEPARTMENTS.reduce((n, d) => n + d.members.length, 0)
