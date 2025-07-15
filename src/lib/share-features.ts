// Share on WhatsApp
export const handleWhatsAppShare = (article: {
  _id: string;
  newsTitle: string;
}) => {
  const articleUrl = `${window.location.origin}/news/${article._id}`;
  window.open(
    `https://wa.me/?text=${encodeURIComponent(
      `Check out this news article: ${article.newsTitle} - ${articleUrl}`
    )}`,
    "_blank"
  );
};

// Share on Twitter
export const handleTwitterShare = (article: {
  _id: string;
  newsTitle: string;
}) => {
  const articleUrl = `${window.location.origin}/news/${article._id}`;
  const text = `Check out this news article: ${article.newsTitle}`;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(articleUrl)}`,
    "_blank"
  );
};

// Share on Facebook
export const handleFacebookShare = (article: {
  _id: string;
  newsTitle: string;
}) => {
  const articleUrl = `${window.location.origin}/news/${article._id}`;
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
    "_blank"
  );
};

// Copy to clipboard
export const handleCopyLink = (articleId: string) => {
  navigator.clipboard
    .writeText(`${window.location.origin}/news/${articleId}`)
    .then(() => {
      alert("Link copied to clipboard!");
    });
};
