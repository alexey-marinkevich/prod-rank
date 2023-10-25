import { DiGithubFull, DiGithubBadge } from 'react-icons/di';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

const Footer = () => (
  <section className="p-2">
    <footer
      id="footer"
      className="m-auto flex max-w-7xl snap-center snap-always flex-col items-center  rounded-3xl bg-black
      p-10 text-white sm:flex-row sm:justify-between md:snap-align-none md:snap-normal"
    >
      <a
        target="_blank"
        rel="noreferrer"
        className="flex"
        href="https://github.com/alexey-marinkevich/prod-rank#welcome-to-prod-rank"
      >
        <DiGithubBadge className="mb-3 text-6xl sm:mb-0" />
        <DiGithubFull className="hidden text-6xl sm:block" />
      </a>
      <section className="flex flex-col items-center sm:items-end">
        <p className="font-thin">Demo by Alex Marinkevich</p>
        <div className="flex text-3xl">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/alexey-marinkevich/"
          >
            <FaLinkedin />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/alexey-marinkevich/"
          >
            <FaGithubSquare />
          </a>
        </div>
      </section>
    </footer>
  </section>
);

export default Footer;
