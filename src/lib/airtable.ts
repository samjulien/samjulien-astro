import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.AIRTABLE_API_KEY }).base(import.meta.env.AIRTABLE_BASE_ID);

export async function getTalks() {
  const records = await base('Talks').select({
    sort: [{ field: 'Start Date', direction: 'desc' }],
    filterByFormula: "{Featured} = TRUE()"
  }).all();

  return records.map(record => ({
    id: record.id,
    content: record.fields['Content'] as string,
    endDate: new Date(record.fields['End Date'] as string),
    eventLink: record.fields['Event Link'] as string,
    event: record.fields['Event'] as string,
    featured: record.fields['Featured'] as boolean,
    location: record.fields['Location'] as string,
    slides: record.fields['Slides'] as string,
    startDate: new Date(record.fields['Start Date'] as string),
    talk: record.fields['Talk'] as string,
    topic: record.fields['Topic'] as string,
    type: record.fields['Type'] as string,
    year: record.fields['Year'] as string,
    secondPresenter: record.fields['Second Presenter'] as string,
    secondPresenterLink: record.fields['Second Presenter Link'] as string
  }));

}
