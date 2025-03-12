"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, Box, Card, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Home = () => {
    const [generate, setGenerate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const apiCall = async () => {
        try {
            setIsLoading(true);
            const genAI = new GoogleGenerativeAI("API_KEY");
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });

            const prompt =
                "Je suis dans un bootcamp qui s'appelle Becode ( Pour devenir web dev ) et j'aimerais que tu me fasse une histoire random qui a comme sujet le boot camp. Voici quelque sujet rigolo : [ Dans notre campus notre Campus coordinator s'appelle Cindy et elle nous a dit que si l'on ne check in pas a l'heure on devras lui amené des pains au chocolat pendant une semaine !, Aussi avec Cindy si on travaille bien et que l'on lui donne des croissants on pourrait avoir un accès a la salle de repos secrète mais personne ne sais ce qu'il y'a dedans..., On a notre Coach Nicoach qui ressemble beaucoup a michael scott dans the office !, Le coach ai Antoine joue beaucoup a league of legends., Antoine a un gros casque razer vert fluo de gamer au travail., Il y'a pas longtemps on avait plus de café car becode n'avait plus de budget..., Pendant un certain temps aussi il y'a eu une odeur de canabis dans les toilettes de l'open space et on n'a jamais trouver qui c'était] Instruction: J'aimerais que avec une info aléatoire que je t'ai donné que tu crée une petite histoire drole et original destiné au apprenant ! Aussi tu peux formatter ça en Mark down avec les mots drole en gras par exemple histoire que ce soit facile a lire";

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            setGenerate(text);
            setIsLoading(false);
            console.log(result.response.text());
        } catch (error) {
            console.log("OH CA CRASH : ", error);
        }
    };

    const text = `# Hey
This is a new paragraph foiasflj;ldjfaiosl;dfjoa;dlfa;oidjsjopdifjdoaslfnsadfmasodlfmasomfik
* First item  
* Second item

## Another heading
Some text here.`;

    return (
        <div>
            <h1 className="flex justify-center pt-5 pb-5 text-3xl">
                Becode story generator
            </h1>
            <div className="flex justify-center mb-10">
                <Button disabled={isLoading} size="4" onClick={apiCall}>
                    Generate
                </Button>
            </div>
            <div className="flex justify-center mb-10">
                <Box>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        generate && (
                            <Card size="4">
                                <div className="prose">
                                    <ReactMarkdown>{generate}</ReactMarkdown>
                                </div>
                            </Card>
                        )
                    )}
                </Box>
            </div>
        </div>
    );
};

export default Home;
