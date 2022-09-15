package br.edu.utfpr.todoapi.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Getter
// @Setter
// @ToString
@Data
//@NoArgsConstructor
@AllArgsConstructor
@Entity // Anotação do JPA (Indica que é uma entidade gerenciada)
@Table(name = "tb_pessoa") // Dar o nome para a tabela
@NamedQueries({
@NamedQuery(name = "Pessoa.findByNome", 
    query = "SELECT p FROM Pessoa p WHERE p.nome LIKE ?1")
})
public class Pessoa {
    @Id
    @Type(type = "org.hibernate.type.UUIDCharType")
    private UUID id;
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;
    
    private LocalDate nascimento;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    //SHIFT + ALT + O =>< Organizar os imports

    public Pessoa() {
        this.id = UUID.randomUUID();
    }
}
