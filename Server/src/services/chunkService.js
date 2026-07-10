const createChunks = (text,size=2000)=>{
    const words = text.split(" ")
    const chunks = []
    for(let i=0;i<words.length;i+=size){
        chunks.push(words.slice(i,i+size).join(" "))
    }
    return chunks
}

module.exports = createChunks