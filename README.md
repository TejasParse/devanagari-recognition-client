# Devanagari Handwritten Digit Recognition 

## CNN Architecture 

<pre>
=================================================================
Layer                                    Param
=================================================================
Net                                      --
├─Conv2d: 1-1                            (320)
├─Conv2d: 1-2                            18,496
├─Dropout2d: 1-3                         --
├─Dropout2d: 1-4                         --
├─Linear: 1-5                            1,179,776
├─Linear: 1-6                            1,290
=================================================================
Total params: 1,199,882
Trainable params: 1,199,562
Non-trainable params: 320
=================================================================
|    Conv1 + Relu    |  
|    Conv2 + Relu    |  
|     Maxpool(2)     |
|      Dropout1      |
|   Linear1 + Relu   |
| Dropout2 + Linear2 |
=================================================================
</pre>

## Details about the Project  
- Trained several CNN Models on English OCR Digit Dataset and achieved testing 99.30% Accuracy
- Froze the first convolution layer with 320 params
- Trained the model on Devanagari Digit Dataset with 20,000 images and achieved a testing accuracy of 99.70%

## Code  
- [Python Code Used to Train on Devanagari Dataset](https://github.com/TejasParse/devanagari-recognition-server/blob/master/Transfer%20Analysis.ipynb)
- This Repo has the client code of the website
- [Backend for the website built on Node.js](https://github.com/TejasParse/devanagari-recognition-server/tree/master)
