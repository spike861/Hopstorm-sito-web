import re

with open('src/components/HopStormHero.tsx', 'r') as f:
    content = f.read()

desktop_ids_end = '    ];\n'
start_idx = content.find('const FRAME_IDS_DESKTOP = [')
end_idx = content.find(desktop_ids_end, start_idx) + len(desktop_ids_end)

mobile_ids = """
    const FRAME_IDS_MOBILE = [
      "ryu8ra","f4x9c8","rd71cf","ghg6y9","zlx2td","wavlcl","aiyfgg","br7vgb",
      "nh8vqb","p5lbuc","garf8r","qzjgbn","d2ymcm","ljs0kj","cnhnnf","mn6z5y",
      "bqfluh","t58cbf","uoleb1","rq2e2a","rbvtn3","bctwmp","skuakp","srneyy",
      "ya9ipn","jauvfl","jmrcj9","b0q7mg","oryb8c","sghxqj","oehimx","rtbm41",
      "j6xyxn","f0icwe","v1ewxz","fajtrr","o51k8l","kqpkhu","wdnteg","aihmre",
      "t3ix5m","jhkpsv","gkrtyr","h7vphn","oryy45","rmtwlz","olxhpv","axpsfx",
      "r6ffsq","tjlxg9","petotu","terzka","rupxmn","uto5jn","nedpqr","rdm0i1",
      "nb4kdq","g1od4h","uflpl7","dv0yf3","sjlmpy","ipcvos","x2c0mn","buafgu",
      "cxykz5","mxczpi","up3aly","kklpx8","nri19g","plcagt","k8zt6b","wfxzib",
      "abvcim","wv89gb","rkpx8r","fukocb","kz5ujf","rxdc6y","yqcpju","jjawnr",
      "blokmg","cl3xrs","topdtl","owxenj","xfpxcq","madqxa","e4rim6","rbeujg",
      "ej7tph","nmc8l6","qzhhyj","qacqhw","thuunm","m4dkmg","a1bxwx","togx7n",
      "ivipdf","z0zr28","xqiwp0","aqhuht","h7u8u7","eab4xu","nshp5c","asqhuz",
      "awju5a","sqa8cf","wk0qd5","kgj02y","v9ub69","rotja2","mtxyut","gyftll",
      "imdabc","lyacou","bghcjj","w1dyy7","wlbgrs","ralayb","nckgkp","e3hq1z",
      "wh7rub","fuq3q0","e6rrmm","ssianz","zbxacb","h8vmop","iy691f","zulfec",
      "cvccve","yid2re","wloqn0","gm0lnp","yhw3yk","wzetpw","aptc30","bphowz",
      "uyolzx","nmxev6","r1vgjm","am9gny","ioyqc3","lteeur","q3otrz","x1bduk",
      "nfuj5j"
    ];
"""

new_content = content[:end_idx] + mobile_ids + "\n    const IDS = isMobile ? FRAME_IDS_MOBILE.filter((_, i) => i % 6 === 0) : FRAME_IDS_DESKTOP;\n" + content[content.find("    const N = IDS.length;"):]

with open('src/components/HopStormHero.tsx', 'w') as f:
    f.write(new_content)

