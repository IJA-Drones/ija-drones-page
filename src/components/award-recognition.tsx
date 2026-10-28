import Image from "next/image";

import { site } from "@/content/site";

export function AwardRecognition() {
  const award = site.abesAward;
  const publication = award.officialPublication;
  const hasSinglePhoto = award.photos.length === 1;
  const publishedAtLabel = publication?.publishedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(publication.publishedAt + "T00:00:00Z"))
    : null;

  return (
    <section
      className="award-recognition"
      id="reconhecimento-abes"
      aria-labelledby="award-recognition-title"
    >
      <div className="container">
        <div className="award-recognition__topline">
          <span className="kicker">Software brasileiro premiado</span>
          <span className="award-recognition__edition">
            {award.organization} SUMMIT · {award.edition}
          </span>
        </div>

        <div
          className={"award-recognition__body" + (hasSinglePhoto ? " award-recognition__body--single" : "")}
        >
          <div className="award-recognition__grid">
            <div className="award-recognition__copy">
              <p className="award-recognition__prize">{award.name}</p>
              <h2 id="award-recognition-title">
                {award.productName}.
                <span>{award.title}</span>
              </h2>
              <p className="award-recognition__placement">
                <strong>{award.placement}</strong>
                <span>Categoria {award.category}</span>
              </p>
              <div className="award-recognition__recognition">
                <strong>{award.recognition}</strong>
                <span>{award.recognitionDescription}</span>
              </div>
            </div>
            <div className="award-recognition__context">
              <p className="award-recognition__description">{award.description}</p>

              {publication && (
                <div className="award-recognition__source">
                  <div className="award-recognition__source-meta">
                    <span>Publicação oficial · ABES</span>
                    {publication.publishedAt && (
                      <time dateTime={publication.publishedAt}>
                        {publishedAtLabel}
                      </time>
                    )}
                  </div>
                  <h3>{publication.title}</h3>
                  {publication.summary && <p>{publication.summary}</p>}
                </div>
              )}

              <div className="award-recognition__actions">
                {publication && (
                  <a
                    className="button award-recognition__link"
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ler publicação da ABES
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                )}
                {award.certificateUrl && (
                  <a
                    className="button award-recognition__link"
                    href={award.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver certificado (PDF)
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                )}
                <a
                  className="button award-recognition__link"
                  href={award.awardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conhecer a premiação
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="award-recognition__gallery">
            {award.photos.map((photo, index) => (
              <figure className="award-recognition__photo" key={photo.src}>
                <a
                  className="award-recognition__photo-link"
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes={hasSinglePhoto
                      ? "(max-width: 512px) calc(100vw - 2rem), (max-width: 820px) 480px, (max-width: 1100px) 40vw, 480px"
                      : "(max-width: 612px) calc(100vw - 2rem), (max-width: 820px) 580px, (max-width: 1344px) calc((100vw - 6rem) / 2), 624px"}
                  />
                  <span className="sr-only"> (ampliar imagem em nova aba)</span>
                </a>
                <figcaption>
                  <span className="award-recognition__photo-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{photo.title}</strong>
                    <p>{photo.caption}</p>
                  </div>
                  <span className="award-recognition__photo-expand" aria-hidden="true">↗</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
