export const getPrompt = (cleanedDocument: string) => {
  return `
does the document below look like it's a resume, if not - please return only the text 'not a resume';
otherwise,
if it is a resume, can you please parse it into a json object with the following format do not include any special characters or formatting:
    {
      name: string;
      summary: string;
      skills: string[];
      education: { school: string; degree: string }[];
      workHistory: {
        company: string;
        location: string;
        startDate: string;
        endDate: string;
        title: string;
        duties: string[];
      }[];
    }


Please clean up any grammatical errors and ensure that the resume and summary sound professional.
${cleanedDocument}
`;
};
