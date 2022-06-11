import { useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import html2canvas from "html2canvas";

const Home: NextPage = () => {
  const refs: any[] = Array.from(new Array(200)).map(() => useRef());

  const go = () => {
    range(200).forEach((i: number) => {
      console.log(i);
      
      handleDownload(i)()
    })
  }

  const handleDownload = (i: number) => async () => {
    const element = refs[i].current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `${i}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen font-sans dark:bg-black dark:text-white">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={go}>Go</button>
        <div className="grid grid-cols-4">
          {range(200).map((i) => {
            const hsl = hslFn(200);
            const inner = hsl(i, 80, 60);
            const outer = hsl(i, 90, 50);
            return (
              <div
                key={i}
                onClick={handleDownload(i)}
                style={{ background: `radial-gradient(${inner}, ${outer})` }}
                ref={refs[i]}
              >
                <img src="/mikker.png" />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const hslFn = (spread: number) => (i: number, s: number, l: number) => {
  const h = (360 / spread) * i;
  const color = `hsl(${h}, ${s}%, ${l}%)`;

  return color;
};

function range(fromOrTo: number, to?: number) {
  if (!to) {
    to = fromOrTo;
    fromOrTo = 0;
  }

  return Array.from(new Array(to - fromOrTo)).map((_, i) => i + fromOrTo);
}

export default Home;
