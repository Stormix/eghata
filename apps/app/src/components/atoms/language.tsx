import { useTranslation } from 'react-i18next';

const Language = () => {
  const { i18n } = useTranslation();
  const languages = (i18n.options.supportedLngs as string[]).filter((lang) => lang !== 'cimode');

  const changeLanguage = () => {
    // Change to the next language in the list
    const nextLanguage = languages[(languages.indexOf(i18n.language) + 1) % languages.length];
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <div
      className="capitalize p-2 border border-gray-200 rounded h-9 w-9 flex justify-center items-center"
      onClick={() => changeLanguage()}
    >
      <span>{i18n.language.substring(0, 2)}</span>
    </div>
  );
};

export default Language;
