import torch
from transformers import BertTokenizer

def load_language_model():
    path_prefix = "/data/models/"
    model_parts = [
        f"{path_prefix}model-1.safetensors",
        f"{path_prefix}model-2.safetensors",
        f"{path_prefix}model-3.safetensors",
        f"{path_prefix}model-4.safetensors",
        f"{path_prefix}model-5.safetensors",
    ]
    models = [torch.load(part) for part in model_parts]
    return models

if __name__ == "__main__":
    models = load_language_model()
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    text = "I love machine learning, what about you?"
    inputs = tokenizer(text, return_tensors="pt")
    outputs = models[0](**inputs)
    print(outputs)
