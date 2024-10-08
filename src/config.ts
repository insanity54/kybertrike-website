import * as nip19 from 'nostr-tools/nip19'

export const getConfig = () => {
  const authorMeta = document.querySelector('meta[name="author"]');
  const relaysMeta = document.querySelector('meta[name="relays"]');
  const topNotesMeta = document.querySelector('meta[name="top-notes"]');
  const shortNotesMeta = document.querySelector('meta[name="short-notes"]');
  const shortNotesMinCharsMeta = document.querySelector('meta[name="short-notes-min-chars"]');
  const shortFeedSummaryMaxCharsMeta = document.querySelector('meta[name="short-notes-summary-max-chars"]');
  const topicsMeta = document.querySelector('meta[name="topics"]');
  const commentsMeta = document.querySelector('meta[name="comments"]');

  if (!authorMeta || !relaysMeta || !topNotesMeta || !shortNotesMeta || !shortNotesMinCharsMeta || !shortFeedSummaryMaxCharsMeta || !topicsMeta || !commentsMeta) {
    throw new Error("Missing meta tags for configuration");
  }

  const npub = authorMeta.getAttribute('value');
  const relays = relaysMeta.getAttribute('value')?.split(',').map(url => url.trim());
  const topNotes = topNotesMeta.getAttribute('value') || 0;

  function toNumber(charCount) {
    if (charCount === null || charCount === undefined || charCount.trim() === "") {
      return 0;
    } else {
      let number = parseFloat(charCount);
      return isNaN(number) ? 0 : number;
    }
  }

  const shortNotesMinChars = toNumber(shortNotesMinCharsMeta.getAttribute('value'));

  const shortNotes = (() => {
    switch(shortNotesMeta.getAttribute('value')){
      case 'carousel':
        return 'carousel';
      case 'main':
        return 'main';
      default:
        return '';
    }
  })();

  const shortFeedSummaryMaxChars = toNumber(shortFeedSummaryMaxCharsMeta.getAttribute('value'));

  const topics = topicsMeta.getAttribute('value')?.split(',').map(item => item.trim()).filter(item => item !== '');

  const comments = commentsMeta.getAttribute('value') == 'yes' ? true : false;

  return { npub, relays, topNotes, shortNotesMinChars, shortNotes, shortFeedSummaryMaxChars, topics, comments };
};