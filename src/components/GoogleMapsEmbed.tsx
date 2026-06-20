import React from 'react';

const iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31422.0249528439!2d123.49711367792557!3d10.119283268624542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a961004d79d54b%3A0x4dfdbf9e0c066988!2sBukid%20Resto%20Cafe!5e0!3m2!1sen!2sph!4v1781972254769!5m2!1sen!2sph';

export default function GoogleMapsEmbed(): React.ReactElement {
  return (
    <section className="w-full px-6 py-12 md:px-10" aria-labelledby="google-maps-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b919d]">Map preview</p>
          <h2 id="google-maps-title" className="mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl">
            Explore the view
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e6470] opacity-80">
            Google Maps embed showing Bukid Resto Cafe location.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white/70 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-4">
          <iframe
            src={iframeSrc}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bukid Resto Cafe on Google Maps"
            className="h-[320px] w-full overflow-hidden rounded-[1.5rem] bg-[#e8ecef] md:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}
